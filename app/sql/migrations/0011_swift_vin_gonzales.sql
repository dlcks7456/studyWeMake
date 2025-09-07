ALTER TABLE "todos" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "todos-insert-policy" ON "todos" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "todos"."profile_id");
DROP POLICY IF EXISTS "todos-select-policy" ON "todos";
CREATE POLICY "todos-select-policy" ON "todos" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "todos"."profile_id");