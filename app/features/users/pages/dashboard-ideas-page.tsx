import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "My Ideas | Dashboard | WeMake" },
		{ name: "description", content: "Manage your ideas" },
	];
};

export default function DashboardIdeasPage() {
	return (
		<div className="space-y-10 h-full">
			<h1 className="text-2xl font-semibold mb6">Claimed Ideas</h1>
			<div className="grid grid-cols-4 gap-6">
				{Array.from({ length: 11 }).map((_, index) => (
					<IdeaCard
						key={index}
						id={index}
						title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
						viewCount={123}
						postedAt="12 hours ago"
						likesCount={12}
						claimed={index % 2 === 0}
					/>
				))}
			</div>
		</div>
	);
}
