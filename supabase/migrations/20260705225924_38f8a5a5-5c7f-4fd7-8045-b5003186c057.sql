
ALTER TABLE public.waitlist ADD COLUMN IF NOT EXISTS feedback text;

-- Allow anon/authenticated to update ONLY the feedback column via server function using row id.
-- Server function uses service role, so no policy required here; keeping UPDATE denied is fine.
