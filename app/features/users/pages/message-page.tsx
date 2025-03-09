import type { Route } from "./+types/message-page";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Message Details | WeMake" },
		{ name: "description", content: "View message details" },
	];
};

export default function MessagePage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="container py-8">
			<h1 className="text-3xl font-bold">Message Details</h1>
		</div>
	);
}
