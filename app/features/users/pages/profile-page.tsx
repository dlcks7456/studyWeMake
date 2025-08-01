import { useOutletContext } from "react-router";
import type { Route } from "./+types/profile-page";
import { makeAdminClient } from "~/supa-client";

export const loader = async ({ params }: Route.LoaderArgs) => {
	const adminClient = makeAdminClient();
	await adminClient.rpc("track_event", {
		event_type: "profile_view",
		event_data: {
			username: params.username,
		},
	});
	return null;
};

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "User Profile | WeMake" },
		{ name: "description", content: "View user profile" },
	];
};

export default function ProfilePage() {
	const { headline, bio } = useOutletContext<{
		headline: string;
		bio: string;
	}>();
	return (
		<div className="max-w-screen-md flex flex-col space-y-10">
			<div>
				<h4 className="text-lg font-bold">Headline</h4>
				<p className="text-muted-foreground">{headline}</p>
			</div>
			<div>
				<h4 className="text-lg font-bold">About</h4>
				<p className="text-muted-foreground">{bio}</p>
			</div>
		</div>
	);
}
