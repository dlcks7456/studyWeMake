import { redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";

export function loader({ request }: Route.LoaderArgs) {
	// find user using the cooklies
	return redirect("/users/nico");
}
