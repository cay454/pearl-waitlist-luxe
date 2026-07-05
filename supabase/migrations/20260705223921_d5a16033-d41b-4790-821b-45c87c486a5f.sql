
-- Lock down SECURITY DEFINER functions to only the roles that need them
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.grant_owner_admin() FROM PUBLIC, anon, authenticated;

-- Tighten the public waitlist insert policy: no longer WITH CHECK (true).
-- Require a non-empty, reasonably-sized email and bounded name.
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.waitlist;
CREATE POLICY "Anyone can join waitlist"
ON public.waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND length(email) BETWEEN 3 AND 254
  AND email LIKE '%_@_%.__%'
  AND (name IS NULL OR length(name) <= 120)
);
