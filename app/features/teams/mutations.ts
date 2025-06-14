import { makeSSRClient, type Database } from "~/supa-client";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { formSchema } from "./pages/submit-team-page";

export const createTeam = async ({
	client,
	userId,
	data,
}: {
	client: SupabaseClient<Database>;
	userId: string;
	data: z.infer<typeof formSchema>;
}) => {
	const { data: teamData, error } = await client
		.from("teams")
		.insert({
			product_name: data.name,
			product_stage: data.stage as
				| "idea"
				| "prototype"
				| "mvp"
				| "growth"
				| "mature",
			team_size: data.size,
			equity_split: data.equity,
			roles: data.roles,
			product_description: data.description,
			team_leader_id: userId,
		})
		.select("team_id")
		.single();
	if (error) {
		throw error;
	}
	return teamData;
};
