import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "My Ideas | Dashboard | WeMake" },
		{ name: "description", content: "Manage your ideas" },
	];
};

export default function DashboardIdeasPage({
	loaderData,
}: Route.ComponentProps) {
	return (
		<div className="container py-8">
			<h1 className="text-3xl font-bold">My Ideas</h1>
		</div>
	);
}
