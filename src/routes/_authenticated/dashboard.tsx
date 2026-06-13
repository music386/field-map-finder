import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — FieldMap" }] }),
  component: DashboardPage,
});

type OutreachRow = {
  id: string;
  from_user_id: string;
  to_user_id: string | null;
  to_org_ref: string;
  to_project_ref: string | null;
  channel: "sms" | "in_app";
  message: string | null;
  created_at: string;
};

type ThreadRow = {
  id: string;
  participant_a: string;
  participant_b: string;
  project_ref: string | null;
  updated_at: string;
};

function DashboardPage() {
  const { user, role, loading } = useAuth();
  const [tab, setTab] = useState<"org" | "sent" | "received" | "threads">("org");

  if (loading || !user) return <Shell><p className="text-sm text-muted-foreground">Loading…</p></Shell>;

  const tabs: { id: typeof tab; label: string }[] = [
    { id: "org", label: role === "donor" ? "My profile" : "My org" },
    { id: "sent", label: "I contacted" },
    { id: "received", label: "Contacted me" },
    { id: "threads", label: "Messages" },
  ];

  return (
    <Shell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{role ?? "account"}</p>
        </div>
        <div className="flex gap-1 rounded-md border bg-card p-1 text-xs">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded px-2 py-1 ${tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "org" && <OrgPanel userId={user.id} role={role} />}
      {tab === "sent" && <OutreachList userId={user.id} direction="sent" />}
      {tab === "received" && <OutreachList userId={user.id} direction="received" />}
      {tab === "threads" && <ThreadsList userId={user.id} />}
    </Shell>
  );
}

type UserOrg = {
  id: string;
  name: string;
  entity_kind: "RLO" | "NGO";
  country: string | null;
  region: string | null;
  description: string | null;
  claimed_seed_org_id: string | null;
};

type UserProject = {
  id: string;
  title: string;
  category: string;
  project_type: string;
  status: string;
  location_label: string;
};

type SmsRow = {
  id: string;
  title: string;
  category: string;
  project_type: "time-bound" | "ongoing";
  target_date: string | null;
  location_label: string;
  lat: number;
  lng: number;
  description: string | null;
  beneficiaries: string | null;
  contact_phone: string | null;
  needs: Record<string, unknown>;
  suggested_seed_org_id: string | null;
  claimed_by_user_id: string | null;
};

type DonorProfile = {
  organisation_name: string | null;
  donor_kind: string | null;
  hq_country: string | null;
  blurb: string | null;
  interests: string[];
  regions: string[];
  recently_funded: number;
};

function OrgPanel({ userId, role }: { userId: string; role: string | null }) {
  const [org, setOrg] = useState<UserOrg | null>(null);
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [donor, setDonor] = useState<DonorProfile | null>(null);
  const [sms, setSms] = useState<SmsRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    if (role === "donor") {
      const { data } = await supabase
        .from("donor_profiles")
        .select("organisation_name, donor_kind, hq_country, blurb, interests, regions, recently_funded")
        .eq("id", userId)
        .maybeSingle();
      setDonor((data as DonorProfile) ?? null);
    } else {
      const { data: orgRow } = await supabase
        .from("user_orgs")
        .select("id, name, entity_kind, country, region, description, claimed_seed_org_id")
        .eq("owner_id", userId)
        .maybeSingle();
      setOrg((orgRow as UserOrg) ?? null);
      const { data: projRows } = await supabase
        .from("user_projects")
        .select("id, title, category, project_type, status, location_label")
        .eq("owner_id", userId)
        .order("created_at", { ascending: false });
      setProjects((projRows as UserProject[]) ?? []);
      if (role === "rlo") {
        const { data: smsRows } = await supabase
          .from("sms_submissions")
          .select("*")
          .is("claimed_by_user_id", null)
          .order("submitted_at", { ascending: false });
        setSms((smsRows as SmsRow[]) ?? []);
      }
    }
    setLoading(false);
  }

  useEffect(() => { refresh(); }, [userId, role]);

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  if (role === "donor") {
    if (!donor) return <Card className="p-6 text-sm text-muted-foreground">No donor profile yet.</Card>;
    return (
      <div className="space-y-4">
        <Card className="space-y-2 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{donor.organisation_name}</h2>
            <Badge variant="secondary" className="text-[10px] uppercase">{donor.donor_kind}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">{donor.hq_country}</p>
          {donor.blurb && <p className="text-sm">{donor.blurb}</p>}
          <div className="flex flex-wrap gap-1 pt-1">
            {donor.interests.map((i) => (
              <Badge key={i} variant="outline" className="text-[10px]">{i}</Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Regions: {donor.regions.join(", ")} · {donor.recently_funded} initiatives funded recently
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {org ? (
        <Card className="space-y-2 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{org.name}</h2>
            <Badge variant="secondary" className="text-[10px] uppercase">{org.entity_kind}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">{org.region}{org.region && org.country ? ", " : ""}{org.country}</p>
          {org.description && <p className="text-sm">{org.description}</p>}
        </Card>
      ) : (
        <Card className="p-6 text-sm text-muted-foreground">No organisation yet.</Card>
      )}

      <section className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Your {projects.length === 1 ? "initiative" : "initiatives"} ({projects.length})
        </h3>
        {projects.length === 0 ? (
          <Card className="p-4 text-sm text-muted-foreground">No initiatives yet.</Card>
        ) : (
          <ul className="space-y-2">
            {projects.map((p) => (
              <li key={p.id}>
                <Card className="space-y-1 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{p.title}</span>
                    <Badge variant="outline" className="text-[10px] uppercase">{p.project_type}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{p.location_label}</span>
                    <span>·</span>
                    <span>{p.category}</span>
                    <span>·</span>
                    <span>{p.status}</span>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      {role === "rlo" && (
        <section className="space-y-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Unclaimed SMS submissions ({sms.length})
            </h3>
            <p className="text-xs text-muted-foreground">
              Submissions sent to FieldMap by SMS (without an account). Claim one to add it to your org's initiatives.
            </p>
          </div>
          {sms.length === 0 ? (
            <Card className="p-4 text-sm text-muted-foreground">Nothing pending.</Card>
          ) : (
            <ul className="space-y-2">
              {sms.map((s) => (
                <SmsClaimCard
                  key={s.id}
                  sms={s}
                  orgId={org?.id ?? null}
                  userId={userId}
                  suggested={org?.claimed_seed_org_id === s.suggested_seed_org_id}
                  onClaimed={refresh}
                />
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}

function SmsClaimCard({
  sms,
  orgId,
  userId,
  suggested,
  onClaimed,
}: {
  sms: SmsRow;
  orgId: string | null;
  userId: string;
  suggested: boolean;
  onClaimed: () => void;
}) {
  const [busy, setBusy] = useState(false);

  async function claim() {
    if (!orgId) {
      toast.error("Create your org first before claiming submissions.");
      return;
    }
    setBusy(true);
    const inserted = await supabase
      .from("user_projects")
      .insert({
        owner_id: userId,
        org_id: orgId,
        title: sms.title,
        category: sms.category,
        project_type: sms.project_type,
        target_date: sms.target_date,
        location_label: sms.location_label,
        lat: sms.lat,
        lng: sms.lng,
        description: sms.description,
        beneficiaries: sms.beneficiaries,
        needs: sms.needs as never,
        status: "seeking support",
      })
      .select("id")
      .single();
    if (inserted.error || !inserted.data) {
      setBusy(false);
      toast.error(inserted.error?.message ?? "Could not claim submission");
      return;
    }
    const updated = await supabase
      .from("sms_submissions")
      .update({
        claimed_by_user_id: userId,
        claimed_project_id: inserted.data.id,
        claimed_at: new Date().toISOString(),
      })
      .eq("id", sms.id);
    setBusy(false);
    if (updated.error) { toast.error(updated.error.message); return; }
    toast.success("Submission claimed and added to your initiatives.");
    onClaimed();
  }

  return (
    <li>
      <Card className="space-y-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium">{sms.title}</p>
            <p className="text-xs text-muted-foreground">{sms.location_label}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="outline" className="text-[10px] uppercase">SMS</Badge>
            {suggested && (
              <Badge className="text-[10px] uppercase">Matches your org</Badge>
            )}
          </div>
        </div>
        {sms.description && <p className="text-xs text-muted-foreground">{sms.description}</p>}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-[11px] text-muted-foreground">
            {sms.category} · {sms.project_type}
            {sms.beneficiaries ? ` · ${sms.beneficiaries}` : ""}
          </span>
          <Button size="sm" onClick={claim} disabled={busy}>
            {busy ? "…" : "Claim"}
          </Button>
        </div>
      </Card>
    </li>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to map
      </Link>
      {children}
    </div>
  );
}

function OutreachList({ userId, direction }: { userId: string; direction: "sent" | "received" }) {
  const [rows, setRows] = useState<OutreachRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const col = direction === "sent" ? "from_user_id" : "to_user_id";
    supabase
      .from("outreach_log")
      .select("*")
      .eq(col, userId)
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => { setRows((data as OutreachRow[]) ?? []); setLoading(false); });
  }, [userId, direction]);

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (rows.length === 0)
    return (
      <Card className="p-6 text-center text-sm text-muted-foreground">
        {direction === "sent"
          ? "You haven't reached out yet. Click any project on the map to start a conversation."
          : "Nobody has reached out yet."}
      </Card>
    );

  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.id}>
          <Card className="space-y-1 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                {new Date(r.created_at).toLocaleString()}
              </span>
              <Badge variant={r.channel === "in_app" ? "default" : "secondary"} className="text-[10px] uppercase">
                {r.channel === "in_app" ? "In-app" : "SMS"}
              </Badge>
            </div>
            <div className="text-sm">
              {direction === "sent" ? "→ " : "← "}
              <span className="font-medium">{r.to_org_ref}</span>
              {r.to_project_ref ? <span className="text-muted-foreground"> · {r.to_project_ref}</span> : null}
            </div>
            {r.message && <p className="text-xs text-muted-foreground">"{r.message}"</p>}
          </Card>
        </li>
      ))}
    </ul>
  );
}

function ThreadsList({ userId }: { userId: string }) {
  const [threads, setThreads] = useState<ThreadRow[]>([]);
  const [active, setActive] = useState<ThreadRow | null>(null);

  useEffect(() => {
    supabase
      .from("threads")
      .select("*")
      .or(`participant_a.eq.${userId},participant_b.eq.${userId}`)
      .order("updated_at", { ascending: false })
      .then(({ data }) => setThreads((data as ThreadRow[]) ?? []));
  }, [userId]);

  if (threads.length === 0)
    return (
      <Card className="p-6 text-center text-sm text-muted-foreground">
        No in-app conversations yet.
      </Card>
    );

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
      <ul className="space-y-2">
        {threads.map((t) => {
          const other = t.participant_a === userId ? t.participant_b : t.participant_a;
          return (
            <li key={t.id}>
              <button
                onClick={() => setActive(t)}
                className={`w-full rounded-md border bg-card p-3 text-left text-sm ${active?.id === t.id ? "border-primary" : ""}`}
              >
                <div className="truncate font-medium">{other.slice(0, 8)}…</div>
                {t.project_ref && <div className="truncate text-xs text-muted-foreground">{t.project_ref}</div>}
              </button>
            </li>
          );
        })}
      </ul>
      {active ? <ThreadView userId={userId} thread={active} /> : (
        <Card className="p-6 text-center text-sm text-muted-foreground">Pick a thread to read.</Card>
      )}
    </div>
  );
}

function ThreadView({ userId, thread }: { userId: string; thread: ThreadRow }) {
  const [messages, setMessages] = useState<{ id: string; from_user_id: string; body: string; created_at: string }[]>([]);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  async function load() {
    const { data } = await supabase
      .from("messages")
      .select("id, from_user_id, body, created_at")
      .eq("thread_id", thread.id)
      .order("created_at");
    setMessages(data ?? []);
  }
  useEffect(() => { load(); }, [thread.id]);

  async function send() {
    if (!body.trim()) return;
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      thread_id: thread.id, from_user_id: userId, body: body.trim(),
    });
    setSending(false);
    if (error) { toast.error(error.message); return; }
    setBody(""); load();
  }

  return (
    <Card className="flex h-[420px] flex-col">
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from_user_id === userId ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-md px-3 py-1.5 text-sm ${m.from_user_id === userId ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
              {m.body}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t p-2">
        <Input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write a message…" onKeyDown={(e) => e.key === "Enter" && send()} maxLength={1000} />
        <Button size="sm" onClick={send} disabled={sending}><Send className="h-3.5 w-3.5" /></Button>
      </div>
    </Card>
  );
}
