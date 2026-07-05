
-- 1) Remove the email-based admin grant trigger and function (PII + typo escalation)
DROP TRIGGER IF EXISTS on_auth_user_created_grant_admin ON auth.users;
DROP FUNCTION IF EXISTS public.grant_owner_admin();

-- Clean up any admin row that may have been granted to the typo address
DELETE FROM public.user_roles
WHERE role = 'admin'::public.app_role
  AND user_id IN (
    SELECT id FROM auth.users WHERE lower(email) = 'micaylajackson@icoud.com'
  );

-- 2) Switch has_role to SECURITY INVOKER so it runs as the caller.
-- The user_roles SELECT policy already lets each user read their own rows,
-- which is sufficient for RLS policies calling has_role(auth.uid(), ...).
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
