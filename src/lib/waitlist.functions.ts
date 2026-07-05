import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  email: z.string().email().max(200),
  name: z.string().trim().max(120).optional(),
});

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("waitlist")
      .insert({ email: data.email.toLowerCase(), name: data.name ?? null });

    if (error) {
      if (error.code === "23505") {
        return { ok: true, alreadyOnList: true as const };
      }
      console.error("[waitlist] insert error", error);
      throw new Error("Unable to join the waitlist. Please try again.");
    }
    return { ok: true, alreadyOnList: false as const };
  });
