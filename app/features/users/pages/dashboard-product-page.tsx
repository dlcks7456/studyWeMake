import type { Route } from "./+types/dashboard-product-page";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Product Management | Dashboard | WeMake" },
		{
			name: "description",
			content: "Manage your product details and settings",
		},
	];
};

export default function DashboardProductPage({
	loaderData,
}: Route.ComponentProps) {
	return (
		<div className="container py-8">
			<h1 className="text-3xl font-bold">Product Management</h1>
		</div>
	);
}
