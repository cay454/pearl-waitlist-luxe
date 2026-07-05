import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const joinSchema = z.object({
  email: z.string().email().max(200),
  name: z.string().trim().max(120).optional(),
});

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
        const { data: existing } = await supabaseAdmin
          .from("waitlist")
          .select("id")
          .eq("email", email)
          .maybeSingle();
        return { ok: true, alreadyOnList: true as const, id: existing?.id ?? null };
      }
      console.error("[waitlist] insert error", error);
      throw new Error("Unable to join the waitlist. Please try again.");
    }
    return { ok: true, alreadyOnList: false as const, id: inserted.id };
  });

const feedbackSchema = z.object({
  id: z.string().uuid(),
  feedback: z.string().trim().min(1).max(500),
});

export const submitWaitlistFeedback = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => feedbackSchema.parse(data))
  .handler(async ({ data }) => {
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
