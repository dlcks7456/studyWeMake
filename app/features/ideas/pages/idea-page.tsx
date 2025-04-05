import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/idea-page";
import { EyeIcon, HeartIcon } from "lucide-react";
import { DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { getGptIdea } from "../queries";
import { DateTime } from "luxon";

export const meta = ({
	data: {
		idea: { gpt_idea_id, idea },
	},
}: Route.MetaArgs) => {
	return [
		{ title: `Idea #${gpt_idea_id} | ${idea}` },
		{ name: "description", content: `Idea #${gpt_idea_id}` },
	];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
	const idea = await getGptIdea(params.ideaId);
	return { idea };
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
	return (
		<div>
			<Hero title={`Idea #${loaderData.idea.gpt_idea_id}`} />
			<div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
				<p className="italic text-center">"{loaderData.idea.idea}"</p>
				<div className="flex items-center text-sm">
					<div className="flex items-center gap-1">
						<EyeIcon className="w-4 h-4" />
						<span>{loaderData.idea.views} views</span>
					</div>
					<DotIcon className="w-4 h-4" />
					<span>
						{DateTime.fromISO(loaderData.idea.created_at).toRelative()}
					</span>
					<DotIcon className="w-4 h-4" />
					<Button variant="outline">
						<HeartIcon className="w-4 h-4" />
						<span>{loaderData.idea.likes}</span>
					</Button>
				</div>
				<Button size="lg">Claim idea now &rarr;</Button>
			</div>
		</div>
	);
}
