import {
	createBrowserClient,
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader,
} from "@supabase/ssr";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";
import { createClient } from "@supabase/supabase-js";

export type Database = MergeDeep<
	SupabaseDatabase,
	{
		public: {
			Views: {
				messages_view: {
					Row: SetNonNullable<
						SupabaseDatabase["public"]["Views"]["messages_view"]["Row"]
					>;
				};
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
				products_overview_view: {
					Row: SetNonNullable<
						SupabaseDatabase["public"]["Views"]["products_overview_view"]["Row"]
					>;
				};
				community_post_detail: {
					Row: SetNonNullable<
						SupabaseDatabase["public"]["Views"]["community_post_detail"]["Row"]
					>;
				};
			};
		};
	}
>;

export const makeAdminClient = () =>
	createClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
	);

export const browserClient = createBrowserClient<Database>(
	"https://wbdacbuwmloxoirwtyef.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZGFjYnV3bWxveG9pcnd0eWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3ODAwNTMsImV4cCI6MjA1NzM1NjA1M30.uRhX71vMiVslelQI2jNA379UPH6IFqUMNRMOLABAsoc",
);

export const makeSSRClient = (request: Request) => {
	const headers = new Headers();
	const serverSideClient = createServerClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return parseCookieHeader(request.headers.get("cookie") ?? "");
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => {
						headers.append(
							"Set-Cookie",
							serializeCookieHeader(name, value, options),
						);
					});
				},
			},
		},
	);

	return { client: serverSideClient, headers };
};
