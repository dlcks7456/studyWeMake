import { DateTime } from "luxon";
import type { Route } from "./+types/daily-leaderboards-page";
import { Link, data, isRouteErrorResponse } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { ProductPagenation } from "~/common/components/product-pagenation";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import { PAGE_SIZE } from "../constants";
import { makeSSRClient } from "~/supa-client";
const paramsSchema = z.object({
	year: z.coerce.number(),
	month: z.coerce.number(),
	day: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params, data }) => {
	const { success, data: parsedData } = paramsSchema.safeParse(params);

	let title = "Daily Leaderboard";
	if (success) {
		const date = DateTime.fromObject({
			year: Number(parsedData.year),
			month: Number(parsedData.month),
			day: Number(parsedData.day),
		})
			.setZone("Asia/Seoul")
			.setLocale("ko");

		const today = DateTime.now().setZone("Asia/Seoul").startOf("day");

		if (date.isValid && date <= today) {
			title = `The best products of ${date.toLocaleString(DateTime.DATE_MED)}`;
		}
	}

	return [
		{
			title: `${title} | wemake`,
		},
	];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { success, data: parsedData } = paramsSchema.safeParse(params);
	const { client, headers } = makeSSRClient(request);

	if (!success) {
		throw data({
			error_code: "INVALID_PARAMS",
			message: "Invalid params",
		});
	}

	const date = DateTime.fromObject(parsedData).setZone("Asia/Seoul");

	if (!date.isValid) {
		throw data(
			{
				error_code: "INVALID_DATE",
				message: "Invalid date",
			},
			{ status: 400 },
		);
	}

	const today = DateTime.now().setZone("Asia/Seoul").startOf("day");

	if (date > today) {
		throw data(
			{
				error_code: "future_date",
				message: "Future date",
			},
			{ status: 400 },
		);
	}

	const url = new URL(request.url);

	const products = await getProductsByDateRange(client, {
		startDate: date.startOf("day"),
		endDate: date.endOf("day"),
		limit: PAGE_SIZE,
		page: Number(url.searchParams.get("page") || 1),
	});

	const totalPages = await getProductPagesByDateRange(client, {
		startDate: date.startOf("day"),
		endDate: date.endOf("day"),
	});

	return {
		products,
		totalPages,
		...parsedData,
	};
};

export default function DailyLeaderboardsPage({
	loaderData,
}: Route.ComponentProps) {
	const urlDate = DateTime.fromObject({
		year: loaderData.year,
		month: loaderData.month,
		day: loaderData.day,
	});
	const previousDate = urlDate.minus({ day: 1 });
	const nextDate = urlDate.plus({ day: 1 });
	const isToday = urlDate.equals(DateTime.now().startOf("day"));

	return (
		<div className="space-y-10">
			<Hero
				title={`The best of ${urlDate.toLocaleString(DateTime.DATE_MED)}`}
			/>
			<div className="flex justify-center items-center gap-2">
				<Button variant="secondary" asChild>
					<Link
						to={`/products/leaderboards/daily/${previousDate.year}/${previousDate.month}/${previousDate.day}`}
					>
						&larr; {previousDate.toLocaleString(DateTime.DATE_SHORT)}
					</Link>
				</Button>
				{!isToday ? (
					<Button variant="secondary" asChild>
						<Link
							to={`/products/leaderboards/daily/${nextDate.year}/${nextDate.month}/${nextDate.day}`}
						>
							{nextDate.toLocaleString(DateTime.DATE_SHORT)} &rarr;
						</Link>
					</Button>
				) : null}
			</div>
			<div className="space-y-5 w-full max-w-screen-md mx-auto">
				{loaderData.products.map((product) => (
					<ProductCard
						key={product.product_id}
						id={Number(product.product_id)}
						name={product.name}
						description={product.tagline}
						reviewsCount={Number(product.reviews)}
						viewCount={Number(product.views)}
						votesCount={Number(product.upvotes)}
					/>
				))}
			</div>
			<ProductPagenation totalPages={loaderData.totalPages} />
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
