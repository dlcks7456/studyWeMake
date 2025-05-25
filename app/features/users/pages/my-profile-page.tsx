import { redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";
import { makeSSRClient } from "~/supa-client";
import { getUserByID } from "../queries";

export async function loader({ request }: Route.LoaderArgs) {
	const { client } = makeSSRClient(request);
	const {
		data: { user },
	} = await client.auth.getUser();

	if (user) {
		const profile = await getUserByID(client, { id: user.id });
		return redirect(`/users/${encodeURIComponent(profile?.username || "")}`);
	}

	return redirect("/auth/login");
}
