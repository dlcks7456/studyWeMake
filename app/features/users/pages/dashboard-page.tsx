import type { Route } from "./+types/dashboard-page";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Dashboard | WeMake" },
		{ name: "description", content: "View your dashboard" },
	];
};

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="container py-8">
			<h1 className="text-3xl font-bold">Dashboard</h1>
		</div>
	);
}
