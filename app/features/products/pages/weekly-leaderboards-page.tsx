import { DateTime } from "luxon";
import type { Route } from "./+types/weekly-leaderboards-page";
import { Link, data, isRouteErrorResponse } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { ProductPagenation } from "~/common/components/product-pagenation";
const paramsSchema = z.object({
	year: z.coerce.number(),
	week: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params, data }) => {
	const { success, data: parsedData } = paramsSchema.safeParse(params);

	let title = "Weekly Leaderboard";
	if (success) {
		const date = DateTime.fromObject({
			weekYear: Number(parsedData.year),
			weekNumber: Number(parsedData.week),
		})
			.setZone("Asia/Seoul")
			.setLocale("ko");

		const today = DateTime.now().setZone("Asia/Seoul").startOf("week");

		if (date.isValid && date <= today) {
			title = `Best of week ${date
				.startOf("week")
				.toLocaleString(DateTime.DATE_SHORT)} - ${date
				.endOf("week")
				.toLocaleString(DateTime.DATE_SHORT)}`;
		}
	}

	return [
		{
			title: `${title} | wemake`,
		},
	];
};

export const loader = ({ params }: Route.LoaderArgs) => {
	const { success, data: parsedData } = paramsSchema.safeParse(params);

	if (!success) {
		throw data({
			error_code: "INVALID_PARAMS",
			message: "Invalid params",
		});
	}

	const date = DateTime.fromObject({
		weekYear: parsedData.year,
		weekNumber: parsedData.week,
	}).setZone("Asia/Seoul");

	if (!date.isValid) {
		throw data(
			{
				error_code: "INVALID_DATE",
				message: "Invalid date",
			},
			{ status: 400 },
		);
	}

	const today = DateTime.now().setZone("Asia/Seoul").startOf("week");

	if (date > today) {
		throw data(
			{
				error_code: "future_date",
				message: "Future date",
			},
			{ status: 400 },
		);
	}

	return {
		...parsedData,
	};
};

export default function WeeklyLeaderboardsPage({
	loaderData,
}: Route.ComponentProps) {
	const urlDate = DateTime.fromObject({
		weekYear: loaderData.year,
		weekNumber: loaderData.week,
	});

	const previousWeek = urlDate.minus({ week: 1 });
	const nextWeek = urlDate.plus({ week: 1 });
	const isToday = urlDate.equals(DateTime.now().startOf("week"));

	return (
		<div className="space-y-10">
			<Hero
				title={`Best of week ${urlDate
					.startOf("week")
					.toLocaleString(DateTime.DATE_SHORT)} - ${urlDate
					.endOf("week")
					.toLocaleString(DateTime.DATE_SHORT)}`}
			/>
			<div className="flex justify-center items-center gap-2">
				<Button variant="secondary" asChild>
					<Link
						to={`/products/leaderboards/weekly/${previousWeek.weekYear}/${previousWeek.weekNumber}`}
					>
						&larr; {previousWeek.toLocaleString(DateTime.DATE_SHORT)}
					</Link>
				</Button>
				{!isToday ? (
					<Button variant="secondary" asChild>
						<Link
							to={`/products/leaderboards/weekly/${nextWeek.weekYear}/${nextWeek.weekNumber}`}
						>
							{nextWeek.toLocaleString(DateTime.DATE_SHORT)} &rarr;
						</Link>
					</Button>
				) : null}
			</div>
			<div className="space-y-5 w-full max-w-screen-md mx-auto">
				{Array.from({ length: 11 }).map((_, index) => (
					<ProductCard
						key={index}
						id={`productId-${index}`}
						name={`Product Name`}
						description={`Product Description`}
						commentCount={12}
						viewCount={12}
						votesCount={120}
					/>
				))}
			</div>
			<ProductPagenation totalPages={10} />
		</div>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	if (isRouteErrorResponse(error)) {
		return (
			<div>
				{error.data.message} / {error.data.error_code}
			</div>
		);
	}

	if (error instanceof Error) {
		return <div>{error.message}</div>;
	}

	return <div>Error in Leaderboard</div>;
}
