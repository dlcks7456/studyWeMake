import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "User Profile | WeMake" },
		{ name: "description", content: "View user profile" },
	];
};

export default function ProfilePage() {
	return (
		<div className="max-w-screen-md flex flex-col space-y-10">
			<div>
				<h4 className="text-lg font-bold">Headline</h4>
				<p className="text-muted-foreground">I'm a product designer</p>
			</div>
			<div>
				<h4 className="text-lg font-bold">About</h4>
				<p className="text-muted-foreground">
					I'm a product designer. I'm a product designer. I'm a product
					designer.
				</p>
			</div>
		</div>
	);
}
