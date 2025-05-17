import { DateTime } from "luxon";
import type { Route } from "./+types/yearly-leaderboards-page";
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
});

export const meta: Route.MetaFunction = ({ params, data }) => {
	const { success, data: parsedData } = paramsSchema.safeParse(params);

	let title = "Yearly Leaderboard";
	if (success) {
		const date = DateTime.fromObject({
			year: Number(parsedData.year),
		}).setZone("Asia/Seoul");

		const today = DateTime.now().setZone("Asia/Seoul").startOf("year");
		if (date.isValid && date <= today) {
			title = `Best of ${date.toLocaleString({ year: "numeric" })}`;
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

	const date = DateTime.fromObject({
		year: parsedData.year,
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

	const today = DateTime.now().setZone("Asia/Seoul").startOf("year");

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
		startDate: date.startOf("year"),
		endDate: date.endOf("year"),
		limit: PAGE_SIZE,
		page: Number(url.searchParams.get("page") || 1),
	});

	const totalPages = await getProductPagesByDateRange(client, {
		startDate: date.startOf("year"),
		endDate: date.endOf("year"),
	});

	return {
		products,
		totalPages,
		...parsedData,
	};
};

export default function YearlyLeaderboardsPage({
	loaderData,
}: Route.ComponentProps) {
	const urlDate = DateTime.fromObject({
		year: loaderData.year,
	});

	const previousYear = urlDate.minus({ year: 1 });
	const nextYear = urlDate.plus({ year: 1 });
	const isToday = urlDate.equals(DateTime.now().startOf("year"));

	return (
		<div className="space-y-10">
			<Hero
				title={`Best of ${urlDate.toLocaleString({
					year: "numeric",
				})}`}
			/>
			<div className="flex justify-center items-center gap-2">
				<Button variant="secondary" asChild>
					<Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
						&larr; {previousYear.toLocaleString({ year: "numeric" })}
					</Link>
				</Button>
				{!isToday ? (
					<Button variant="secondary" asChild>
						<Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
							{nextYear.toLocaleString({ year: "numeric" })}
							&rarr;
						</Link>
					</Button>
				) : null}
			</div>
			<div className="space-y-5 w-full max-w-screen-md mx-auto">
				{loaderData.products.map((product) => (
					<ProductCard
						key={Number(product.product_id)}
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
