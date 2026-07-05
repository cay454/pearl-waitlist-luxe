import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { joinWaitlist, submitWaitlistFeedback } from "@/lib/waitlist.functions";

type Status = "idle" | "loading" | "success" | "already" | "error";

export function WaitlistForm() {
  const join = useServerFn(joinWaitlist);
  const sendFeedback = useServerFn(submitWaitlistFeedback);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [entryId, setEntryId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackState, setFeedbackState] = useState<"idle" | "loading" | "sent">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await join({ data: { email, name: name || undefined } });
      setEntryId(res.id);
      setStatus(res.alreadyOnList ? "already" : "success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  async function onFeedback(e: React.FormEvent) {
    e.preventDefault();
    if (!entryId || !feedback.trim()) return;
    setFeedbackState("loading");
    try {
      await sendFeedback({ data: { id: entryId, feedback: feedback.trim() } });
      setFeedbackState("sent");
    } catch {
      setFeedbackState("idle");
    }
  }

  if (status === "success" || status === "already") {
    return (
      <div className="space-y-4">
        <div className="border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 p-8 text-center">
          <p className="font-display text-3xl text-gold">
            {status === "already" ? "You're already on the list." : "Welcome to Pearl."}
          </p>
          <p className="mt-3 text-sm text-muted-foreground tracking-wide">
            We'll write to you the moment the first drop opens.
          </p>
        </div>
        {entryId && (
          <div className="border border-[color:var(--gold)]/30 p-4">
            {feedbackState === "sent" ? (
              <p className="text-center text-xs uppercase tracking-luxe text-gold">
                Thank you for sharing.
              </p>
            ) : (
              <form onSubmit={onFeedback} className="space-y-3">
                <label className="block text-xs uppercase tracking-luxe text-muted-foreground">
                  Let us know what you like about Pearl
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  maxLength={500}
                  rows={2}
                  placeholder="A few words…"
                  className="w-full resize-none border border-[color:var(--gold)]/30 bg-transparent px-3 py-2 text-sm tracking-wide text-foreground placeholder:text-muted-foreground/70 focus:border-[color:var(--gold)] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={feedbackState === "loading" || !feedback.trim()}
                  className="w-full border border-[color:var(--gold)] px-4 py-2 text-[11px] font-medium uppercase tracking-luxe text-gold transition hover:bg-[color:var(--gold)]/10 disabled:opacity-50"
                >
                  {feedbackState === "loading" ? "Sending…" : "Share"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Your name (and age)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-[color:var(--gold)]/30 bg-transparent px-5 py-4 text-sm tracking-wide text-foreground placeholder:text-muted-foreground/70 focus:border-[color:var(--gold)] focus:outline-none"
        />
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[color:var(--gold)]/30 bg-transparent px-5 py-4 text-sm tracking-wide text-foreground placeholder:text-muted-foreground/70 focus:border-[color:var(--gold)] focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative w-full overflow-hidden border border-[color:var(--gold)] bg-[color:var(--gold)] px-8 py-4 text-xs font-medium uppercase tracking-luxe text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--gold-soft)] disabled:opacity-60"
      >
        {status === "loading" ? "Securing your place…" : "Reserve your place"}
      </button>
      {error && (
        <p className="text-xs uppercase tracking-wider text-destructive">{error}</p>
      )}
      <p className="text-center text-[11px] uppercase tracking-luxe text-muted-foreground">
        Limited first release · No spam, ever
      </p>
    </form>
  );
}
