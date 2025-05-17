import { TeamCard } from "../components/team-card";
import type { Route } from "./+types/teams-page";
import { Hero } from "~/common/components/hero";
import { getTeams } from "../queries";
import { makeSSRClient } from "~/supa-client";
export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Teams | wemake" },
		{ name: "description", content: "Discover and connect with amazing teams" },
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { client, headers } = makeSSRClient(request);
	const teams = await getTeams(client, { limit: 20 });
	return { teams };
};

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="space-y-20">
			<Hero title="Team" subtitle="Find a team looking for any member" />
			<div className="grid grid-cols-4 gap-4">
				{loaderData.teams.map((team) => (
					<TeamCard
						key={team.team_id}
						id={team.team_id}
						leaderUserName={team.team_leader.username}
						leaderAvatarUrl={team.team_leader.avatar}
						roles={team.roles}
						productDescription={team.product_description}
					/>
				))}
			</div>
		</div>
	);
}
