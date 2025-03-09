import { TeamCard } from "../components/team-card";
import type { Route } from "./+types/teams-page";
import { Hero } from "~/common/components/hero";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Teams | wemake" },
		{ name: "description", content: "Discover and connect with amazing teams" },
	];
};

export default function TeamsPage() {
	return (
		<div className="space-y-20">
			<Hero title="Team" subtitle="Find a team looking for any member" />
			<div className="grid grid-cols-4 gap-4">
				{Array.from({ length: 11 }).map((_, index) => (
					<TeamCard
						key={index}
						id="teamId"
						leaderUserName="lynn"
						leaderAvatarUrl="https://github.com/inthetiger.png"
						positions={[
							"React Developer",
							"Backend Developer",
							"Product Manager",
						]}
						projectDescription="a new social media platform"
					/>
				))}
			</div>
		</div>
	);
}
