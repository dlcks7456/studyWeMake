import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";
import { makeSSRClient } from "~/supa-client";
import { getClaimedIdeas, getLoggedInUserID } from "../queries";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "My Ideas | Dashboard | WeMake" },
		{ name: "description", content: "Manage your ideas" },
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { client, headers } = makeSSRClient(request);
	const userId = await getLoggedInUserID(client);
	const ideas = await getClaimedIdeas(client, { userId });

	return { ideas };
};

export default function DashboardIdeasPage({
	loaderData,
}: Route.ComponentProps) {
	return (
		<div className="space-y-10 h-full">
			<h1 className="text-2xl font-semibold mb6">Claimed Ideas</h1>
			<div className="grid grid-cols-4 gap-6">
				{loaderData.ideas.map((idea) => (
					<IdeaCard
						key={idea.gpt_idea_id}
						id={idea.gpt_idea_id}
						title={idea.idea}
						owner={true}
					/>
				))}
			</div>
		</div>
	);
}
