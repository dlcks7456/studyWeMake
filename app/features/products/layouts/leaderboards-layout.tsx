import { Outlet, data } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/leaderboards-layout";
const searchParamsSchema = z.object({
	page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url);
	const { success: pageParamsSuccess, data: parsedPage } =
		searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
	if (!pageParamsSuccess) {
		throw data(
			{
				error_code: "INVALID_PAGE_PARAMS",
				message: "Invalid page params",
			},
			{ status: 400 },
		);
	}
};

export default function LeaderboardsLayout() {
	return <Outlet />;
}
