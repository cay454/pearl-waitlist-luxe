import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { listWaitlist, checkIsAdmin } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin · Pearl Waitlist" }] }),
});

function AdminPage() {
  const navigate = useNavigate();
  const listFn = useServerFn(listWaitlist);
  const adminFn = useServerFn(checkIsAdmin);
  const [search, setSearch] = useState("");

  const adminCheck = useQuery({
    queryKey: ["is-admin"],
    queryFn: () => adminFn(),
  });

  const waitlistQuery = useQuery({
    queryKey: ["waitlist"],
    queryFn: () => listFn(),
    enabled: adminCheck.data?.isAdmin === true,
  });

  useEffect(() => {
    if (adminCheck.data && !adminCheck.data.isAdmin) {
      // not admin
    }
  }, [adminCheck.data]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const entries = waitlistQuery.data?.entries ?? [];
  const filtered = useMemo(
    () =>
      entries.filter(
        (e) =>
          e.email.toLowerCase().includes(search.toLowerCase()) ||
          (e.name?.toLowerCase().includes(search.toLowerCase()) ?? false),
      ),
    [entries, search],
  );

  const today = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return entries.filter((e) => new Date(e.created_at) >= start).length;
  }, [entries]);

  const last7 = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return entries.filter((e) => new Date(e.created_at).getTime() >= cutoff).length;
  }, [entries]);

  if (adminCheck.isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (adminCheck.data && !adminCheck.data.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-serif text-foreground mb-2">Access denied</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Your account doesn't have admin privileges. Ask the project owner to grant you the
            <code className="mx-1 px-1 bg-muted rounded">admin</code> role in the backend.
          </p>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 border border-border rounded-md text-sm hover:bg-accent"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  function exportCsv() {
    const rows = [["Email", "Name", "Feedback", "Joined"], ...filtered.map((e) => [e.email, e.name ?? "", e.feedback ?? "", e.created_at])];
    const sanitize = (v: string) => (/^[=+\-@\t\r]/.test(v) ? `'${v}` : v);
    const csv = rows.map((r) => r.map((v) => `"${sanitize(String(v)).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pearl-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-serif tracking-[0.3em] text-primary">PEARL</Link>
            <span className="text-sm text-muted-foreground">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              ← Back to site
            </Link>
            <button
              onClick={handleSignOut}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif text-foreground">Waitlist</h1>
            <p className="text-sm text-muted-foreground mt-1">Everyone who's reserved their place.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total signups" value={entries.length} />
          <StatCard label="Last 7 days" value={last7} />
          <StatCard label="Today" value={today} />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search email or name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-2 bg-card border border-border rounded-md text-sm text-foreground"
          />
          <button
            onClick={exportCsv}
            disabled={!filtered.length}
            className="px-4 py-2 border border-border rounded-md text-sm hover:bg-accent disabled:opacity-50"
          >
            Export CSV
          </button>
          <button
            onClick={() => waitlistQuery.refetch()}
            className="px-4 py-2 border border-border rounded-md text-sm hover:bg-accent"
          >
            Refresh
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {waitlistQuery.isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading…</div>
          ) : waitlistQuery.error ? (
            <div className="p-8 text-center text-destructive text-sm">
              {(waitlistQuery.error as Error).message}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              {entries.length === 0 ? "No signups yet." : "No matches."}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Feedback</th>
                  <th className="px-4 py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((entry) => (
                  <tr key={entry.id} className="border-b border-border/50 last:border-0 hover:bg-accent/30">
                    <td className="px-4 py-3 text-foreground">{entry.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{entry.name ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground max-w-xs truncate" title={entry.feedback ?? ""}>{entry.feedback ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(entry.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-3xl font-serif text-foreground mt-2">{value}</div>
    </div>
  );
}
