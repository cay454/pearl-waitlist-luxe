import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createHmac, timingSafeEqual } from "crypto";

const joinSchema = z.object({
  email: z.string().email().max(200),
  name: z.string().trim().max(120).optional(),
});

function getSigningSecret() {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Server misconfigured");
  return secret;
}

function signEntry(id: string) {
  return createHmac("sha256", getSigningSecret()).update(`waitlist:${id}`).digest("hex");
}

function verifyEntryToken(id: string, token: string) {
  const expected = signEntry(id);
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(token, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => joinSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = data.email.toLowerCase();
    const { data: inserted, error } = await supabaseAdmin
      .from("waitlist")
      .insert({ email, name: data.name ?? null })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        return { ok: true, alreadyOnList: true as const, id: null, token: null };
      }
      console.error("[waitlist] insert error", error);
      throw new Error("Unable to join the waitlist. Please try again.");
    }
    return {
      ok: true,
      alreadyOnList: false as const,
      id: inserted.id,
      token: signEntry(inserted.id),
    };
  });

const feedbackSchema = z.object({
  id: z.string().uuid(),
  token: z.string().regex(/^[a-f0-9]{64}$/),
  feedback: z.string().trim().min(1).max(500),
});

export const submitWaitlistFeedback = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => feedbackSchema.parse(data))
  .handler(async ({ data }) => {
    if (!verifyEntryToken(data.id, data.token)) {
      throw new Error("Invalid or expired feedback token.");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("waitlist")
      .update({ feedback: data.feedback })
      .eq("id", data.id);

    if (error) {
      console.error("[waitlist] feedback error", error);
      throw new Error("Unable to save your feedback. Please try again.");
    }
    return { ok: true };
  });
