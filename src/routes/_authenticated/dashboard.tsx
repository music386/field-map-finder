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
  const [tab, setTab] = useState<"sent" | "received" | "threads">("sent");

  if (loading || !user) return <Shell><p className="text-sm text-muted-foreground">Loading…</p></Shell>;

  return (
    <Shell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{role ?? "account"}</p>
        </div>
        <div className="flex gap-1 rounded-md border bg-card p-1 text-xs">
          {(["sent","received","threads"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`rounded px-2 py-1 capitalize ${tab === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
            >
              {k === "sent" ? "I contacted" : k === "received" ? "Contacted me" : "Messages"}
            </button>
          ))}
        </div>
      </div>

      {tab === "sent" && <OutreachList userId={user.id} direction="sent" />}
      {tab === "received" && <OutreachList userId={user.id} direction="received" />}
      {tab === "threads" && <ThreadsList userId={user.id} />}
    </Shell>
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
