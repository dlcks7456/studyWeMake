import { createClient } from "@supabase/supabase-js";
import type { Database as SupabaseDatabase } from "database.types";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";

type Database = MergeDeep<
	SupabaseDatabase,
	{
		public: {
			Views: {
				community_post_list_view: {
					Row: SetFieldType<
						SetNonNullable<
							SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]
						>,
						"author_avatar",
						string | null
					>;
				};
				gpt_ideas_view: {
					Row: SetNonNullable<
						SupabaseDatabase["public"]["Views"]["gpt_ideas_view"]["Row"]
					>;
				};
				teams_profile_list_view: {
					Row: SetNonNullable<
						SupabaseDatabase["public"]["Views"]["teams_profile_list_view"]["Row"]
					>;
				};
			};
		};
	}
>;

export const client = createClient<Database>(
	// process.env.SUPABASE_URL!,
	// process.env.SUPABASE_ANON_KEY!,
	"https://wbdacbuwmloxoirwtyef.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZGFjYnV3bWxveG9pcnd0eWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3ODAwNTMsImV4cCI6MjA1NzM1NjA1M30.uRhX71vMiVslelQI2jNA379UPH6IFqUMNRMOLABAsoc",
);
