import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { organizations as seedOrgs } from "@/lib/fieldmap-data";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "My profile — FieldMap" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, role, loading } = useAuth();

  if (loading || !user) return <Shell><p className="text-sm text-muted-foreground">Loading…</p></Shell>;

  return (
    <Shell>
      <ProfileBasics userId={user.id} email={user.email ?? ""} />
      {role === "donor" && <DonorProfileEditor userId={user.id} />}
      {(role === "rlo" || role === "ngo") && (
        <OrgsAndProjectsEditor userId={user.id} role={role} />
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to map
      </Link>
      <h1 className="text-2xl font-semibold">My profile</h1>
      {children}
    </div>
  );
}

function ProfileBasics({ userId, email }: { userId: string; email: string }) {
  const [displayName, setDisplayName] = useState("");
  const [contactEmail, setContactEmail] = useState(email);
  const [contactPhone, setContactPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("display_name, contact_email, contact_phone")
      .eq("id", userId)
      .maybeSingle()
      .then(({ data }) => {
        setDisplayName(data?.display_name ?? "");
        setContactEmail(data?.contact_email ?? email);
        setContactPhone(data?.contact_phone ?? "");
      });
  }, [userId, email]);

  async function save() {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, contact_email: contactEmail, contact_phone: contactPhone })
      .eq("id", userId);
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
  }

  return (
    <Card className="space-y-4 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Account</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Display name">
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={120} />
        </Field>
        <Field label="Contact email">
          <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} maxLength={255} />
        </Field>
        <Field label="Contact phone (E.164, optional)">
          <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+1 555 123 4567" maxLength={32} />
        </Field>
      </div>
      <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
    </Card>
  );
}

function DonorProfileEditor({ userId }: { userId: string }) {
  const [data, setData] = useState({
    organisation_name: "",
    donor_kind: "",
    hq_country: "",
    website: "",
    blurb: "",
    interests: "",
    regions: "",
    focus_areas: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("donor_profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle()
      .then(({ data: row }) => {
        if (!row) return;
        setData({
          organisation_name: row.organisation_name ?? "",
          donor_kind: row.donor_kind ?? "",
          hq_country: row.hq_country ?? "",
          website: row.website ?? "",
          blurb: row.blurb ?? "",
          interests: (row.interests ?? []).join(", "),
          regions: (row.regions ?? []).join(", "),
          focus_areas: (row.focus_areas ?? []).join(", "),
        });
      });
  }, [userId]);

  async function save() {
    setSaving(true);
    const payload = {
      id: userId,
      organisation_name: data.organisation_name,
      donor_kind: data.donor_kind,
      hq_country: data.hq_country,
      website: data.website,
      blurb: data.blurb,
      interests: data.interests.split(",").map((s) => s.trim()).filter(Boolean),
      regions: data.regions.split(",").map((s) => s.trim()).filter(Boolean),
      focus_areas: data.focus_areas.split(",").map((s) => s.trim()).filter(Boolean),
    };
    const { error } = await supabase.from("donor_profiles").upsert(payload);
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Donor profile saved");
  }

  return (
    <Card className="space-y-4 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Donor profile</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Organisation name">
          <Input value={data.organisation_name} onChange={(e) => setData({ ...data, organisation_name: e.target.value })} />
        </Field>
        <Field label="Donor kind (foundation / corporate / individual)">
          <Input value={data.donor_kind} onChange={(e) => setData({ ...data, donor_kind: e.target.value })} />
        </Field>
        <Field label="HQ country">
          <Input value={data.hq_country} onChange={(e) => setData({ ...data, hq_country: e.target.value })} />
        </Field>
        <Field label="Website">
          <Input value={data.website} onChange={(e) => setData({ ...data, website: e.target.value })} />
        </Field>
      </div>
      <Field label="About you">
        <Textarea value={data.blurb} onChange={(e) => setData({ ...data, blurb: e.target.value })} rows={3} maxLength={500} />
      </Field>
      <Field label="Interests (comma separated)">
        <Input value={data.interests} onChange={(e) => setData({ ...data, interests: e.target.value })} />
      </Field>
      <Field label="Regions (comma separated)">
        <Input value={data.regions} onChange={(e) => setData({ ...data, regions: e.target.value })} />
      </Field>
      <Field label="Focus areas (comma separated)">
        <Input value={data.focus_areas} onChange={(e) => setData({ ...data, focus_areas: e.target.value })} />
      </Field>
      <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save donor profile"}</Button>
    </Card>
  );
}

function OrgsAndProjectsEditor({ userId, role }: { userId: string; role: "rlo" | "ngo" }) {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function reload() {
    setLoading(true);
    const [{ data: o }, { data: p }] = await Promise.all([
      supabase.from("user_orgs").select("*").eq("owner_id", userId).order("created_at"),
      supabase.from("user_projects").select("*").eq("owner_id", userId).order("created_at"),
    ]);
    setOrgs(o ?? []);
    setProjects(p ?? []);
    setLoading(false);
  }
  useEffect(() => { reload(); }, [userId]);

  return (
    <>
      <Card className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            My organisations
          </h2>
        </div>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <>
            <ul className="space-y-2">
              {orgs.map((o) => (
                <OrgRow key={o.id} org={o} onChanged={reload} />
              ))}
            </ul>
            <NewOrgForm userId={userId} role={role} onCreated={reload} />
          </>
        )}
      </Card>

      <Card className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            My projects ({projects.length})
          </h2>
        </div>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : projects.length === 0 ? (
          <p className="text-xs text-muted-foreground">No projects yet. Add one below.</p>
        ) : (
          <ul className="space-y-2">
            {projects.map((p) => (
              <li key={p.id} className="flex items-start justify-between gap-2 rounded-md border bg-card p-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{p.title}</span>
                    <Badge variant="secondary" className="text-[10px] capitalize">{p.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.location_label}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={async () => {
                    if (!confirm("Delete this project?")) return;
                    const { error } = await supabase.from("user_projects").delete().eq("id", p.id);
                    if (error) toast.error(error.message); else { toast.success("Deleted"); reload(); }
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        )}
        <NewProjectForm userId={userId} orgs={orgs} role={role} onCreated={reload} />
      </Card>
    </>
  );
}

function OrgRow({ org, onChanged }: { org: any; onChanged: () => void }) {
  return (
    <li className="flex items-start justify-between gap-2 rounded-md border bg-card p-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{org.name}</span>
          <Badge className="text-[10px]">{org.entity_kind}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          {org.region ? `${org.region}, ` : ""}{org.country}
          {org.claimed_seed_org_id ? " · claimed" : ""}
        </p>
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={async () => {
          if (!confirm(`Delete "${org.name}"? Its projects will also be deleted.`)) return;
          const { error } = await supabase.from("user_orgs").delete().eq("id", org.id);
          if (error) toast.error(error.message); else { toast.success("Deleted"); onChanged(); }
        }}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </li>
  );
}

function NewOrgForm({ userId, role, onCreated }: { userId: string; role: "rlo" | "ngo"; onCreated: () => void }) {
  const [mode, setMode] = useState<"new" | "claim">("new");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [seedOrgId, setSeedOrgId] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open)
    return (
      <Button size="sm" variant="outline" onClick={() => setOpen(true)} className="gap-1.5">
        <Plus className="h-3.5 w-3.5" /> Add organisation
      </Button>
    );

  async function save() {
    setSaving(true);
    if (mode === "claim" && role === "rlo") {
      const seed = seedOrgs.find((o) => o.id === seedOrgId);
      if (!seed) { toast.error("Pick an organisation"); setSaving(false); return; }
      const { error } = await supabase.from("user_orgs").insert({
        owner_id: userId,
        name: seed.name,
        entity_kind: "RLO",
        country: seed.country,
        region: seed.region,
        lat: seed.lat,
        lng: seed.lng,
        description: seed.description,
        phone: seed.phone,
        claimed_seed_org_id: seed.id,
      });
      setSaving(false);
      if (error) { toast.error(error.message); return; }
    } else {
      const { error } = await supabase.from("user_orgs").insert({
        owner_id: userId,
        name,
        entity_kind: role === "rlo" ? "RLO" : "NGO",
        country,
        region,
        lat: lat ? Number(lat) : null,
        lng: lng ? Number(lng) : null,
        description,
        phone,
      });
      setSaving(false);
      if (error) { toast.error(error.message); return; }
    }
    toast.success("Organisation added");
    setOpen(false);
    setName(""); setCountry(""); setRegion(""); setLat(""); setLng(""); setDescription(""); setPhone(""); setSeedOrgId("");
    onCreated();
  }

  return (
    <div className="space-y-3 rounded-md border bg-muted/30 p-3">
      {role === "rlo" && (
        <div className="flex gap-2">
          <button type="button" onClick={() => setMode("new")} className={`rounded-md px-2 py-1 text-xs ${mode === "new" ? "bg-primary text-primary-foreground" : "bg-background"}`}>Create new</button>
          <button type="button" onClick={() => setMode("claim")} className={`rounded-md px-2 py-1 text-xs ${mode === "claim" ? "bg-primary text-primary-foreground" : "bg-background"}`}>Claim from list</button>
        </div>
      )}

      {mode === "claim" && role === "rlo" ? (
        <Field label="Pick an organisation from the seed list">
          <select className="w-full rounded-md border bg-background p-2 text-sm" value={seedOrgId} onChange={(e) => setSeedOrgId(e.target.value)}>
            <option value="">— Select —</option>
            {seedOrgs
              .filter((o) => (o.entityKind ?? "RLO") === "RLO")
              .map((o) => (
                <option key={o.id} value={o.id}>{o.name} — {o.country}</option>
              ))}
          </select>
        </Field>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Organisation name"><Input value={name} onChange={(e) => setName(e.target.value)} required /></Field>
          <Field label="Country"><Input value={country} onChange={(e) => setCountry(e.target.value)} /></Field>
          <Field label="Region / city"><Input value={region} onChange={(e) => setRegion(e.target.value)} /></Field>
          <Field label="Phone (E.164)"><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44 7..." /></Field>
          <Field label="Latitude"><Input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="51.5" /></Field>
          <Field label="Longitude"><Input value={lng} onChange={(e) => setLng(e.target.value)} placeholder="-0.1" /></Field>
          <div className="sm:col-span-2">
            <Field label="About the organisation">
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} maxLength={1000} />
            </Field>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button size="sm" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </div>
  );
}

const CATEGORIES = ["energy","water/WASH","education","healthcare","livelihoods","shelter","legal aid","protection","food security"] as const;

function NewProjectForm({ userId, orgs, role, onCreated }: { userId: string; orgs: any[]; role: "rlo" | "ngo"; onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [orgId, setOrgId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("education");
  const [projectType, setProjectType] = useState<"ongoing" | "time-bound">("ongoing");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [beneficiaries, setBeneficiaries] = useState("100–500");
  const [fundingAmount, setFundingAmount] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open)
    return (
      <Button size="sm" variant="outline" onClick={() => setOpen(true)} className="gap-1.5" disabled={orgs.length === 0}>
        <Plus className="h-3.5 w-3.5" /> Add project
        {orgs.length === 0 ? <span className="ml-1 text-[10px] text-muted-foreground">(add an organisation first)</span> : null}
      </Button>
    );

  async function save() {
    if (!orgId) { toast.error("Pick an organisation"); return; }
    if (!title || !location || !lat || !lng) { toast.error("Title, location, lat and lng are required"); return; }
    setSaving(true);
    const needs: any = {};
    if (fundingAmount) needs.funding = { amount: Number(fundingAmount), currency: "USD" };
    const { error } = await supabase.from("user_projects").insert({
      owner_id: userId,
      org_id: orgId,
      title, category, project_type: projectType,
      location_label: location,
      lat: Number(lat), lng: Number(lng),
      description,
      beneficiaries,
      status: "seeking support",
      needs,
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Project added");
    setOpen(false);
    setTitle(""); setLocation(""); setLat(""); setLng(""); setDescription(""); setFundingAmount("");
    onCreated();
  }

  void role;
  return (
    <div className="space-y-3 rounded-md border bg-muted/30 p-3">
      <Field label="Organisation">
        <select className="w-full rounded-md border bg-background p-2 text-sm" value={orgId} onChange={(e) => setOrgId(e.target.value)}>
          <option value="">— Select —</option>
          {orgs.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title"><Input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={200} /></Field>
        <Field label="Category">
          <select className="w-full rounded-md border bg-background p-2 text-sm" value={category} onChange={(e) => setCategory(e.target.value as any)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Type">
          <select className="w-full rounded-md border bg-background p-2 text-sm" value={projectType} onChange={(e) => setProjectType(e.target.value as any)}>
            <option value="ongoing">Ongoing</option>
            <option value="time-bound">Time-bound</option>
          </select>
        </Field>
        <Field label="Beneficiaries">
          <select className="w-full rounded-md border bg-background p-2 text-sm" value={beneficiaries} onChange={(e) => setBeneficiaries(e.target.value)}>
            <option value="under 100">under 100</option>
            <option value="100–500">100–500</option>
            <option value="500–2,000">500–2,000</option>
            <option value="2,000+">2,000+</option>
          </select>
        </Field>
        <Field label="Location label"><Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Athens, Greece" /></Field>
        <Field label="Funding target (USD, optional)"><Input value={fundingAmount} onChange={(e) => setFundingAmount(e.target.value)} placeholder="25000" /></Field>
        <Field label="Latitude"><Input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="37.97" /></Field>
        <Field label="Longitude"><Input value={lng} onChange={(e) => setLng(e.target.value)} placeholder="23.72" /></Field>
        <div className="sm:col-span-2">
          <Field label="Description"><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} maxLength={1500} /></Field>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save project"}</Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}
