import { DateTime } from "luxon";
import type { Route } from "./+types/monthly-leaderboards-page";
import { Link, data, isRouteErrorResponse } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { ProductPagenation } from "~/common/components/product-pagenation";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import { PAGE_SIZE } from "../constants";

const paramsSchema = z.object({
	year: z.coerce.number(),
	month: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params, data }) => {
	const { success, data: parsedData } = paramsSchema.safeParse(params);

	let title = "Monthly Leaderboard";
	if (success) {
		const date = DateTime.fromObject({
			year: Number(parsedData.year),
			month: Number(parsedData.month),
		})
			.setZone("Asia/Seoul")
			.setLocale("ko");

		const today = DateTime.now().setZone("Asia/Seoul").startOf("month");

		if (date.isValid && date <= today) {
			title = `Best of ${date.toLocaleString({
				month: "long",
				year: "2-digit",
			})}`;
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

	if (!success) {
		throw data({
			error_code: "INVALID_PARAMS",
			message: "Invalid params",
		});
	}

	const date = DateTime.fromObject({
		year: parsedData.year,
		month: parsedData.month,
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

	const today = DateTime.now().setZone("Asia/Seoul").startOf("month");

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

	const products = await getProductsByDateRange({
		startDate: date.startOf("month"),
		endDate: date.endOf("month"),
		limit: PAGE_SIZE,
		page: Number(url.searchParams.get("page") || 1),
	});

	const totalPages = await getProductPagesByDateRange({
		startDate: date.startOf("month"),
		endDate: date.endOf("month"),
	});

	return {
		products,
		totalPages,
		...parsedData,
	};
};

export default function MonthlyLeaderboardsPage({
	loaderData,
}: Route.ComponentProps) {
	const urlDate = DateTime.fromObject({
		year: loaderData.year,
		month: loaderData.month,
	});

	const previousMonth = urlDate.minus({ month: 1 });
	const nextMonth = urlDate.plus({ month: 1 });
	const isToday = urlDate.equals(DateTime.now().startOf("month"));

	return (
		<div className="space-y-10">
			<Hero
				title={`Best of ${urlDate.toLocaleString({
					month: "long",
					year: "2-digit",
				})}`}
			/>
			<div className="flex justify-center items-center gap-2">
				<Button variant="secondary" asChild>
					<Link
						to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}
					>
						&larr;{" "}
						{previousMonth.toLocaleString({
							month: "long",
							year: "2-digit",
						})}
					</Link>
				</Button>
				{!isToday ? (
					<Button variant="secondary" asChild>
						<Link
							to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}
						>
							{nextMonth.toLocaleString({
								month: "long",
								year: "2-digit",
							})}
							&rarr;
						</Link>
					</Button>
				) : null}
			</div>
			<div className="space-y-5 w-full max-w-screen-md mx-auto">
				{loaderData.products.map((product) => (
					<ProductCard
						key={product.product_id}
						id={product.product_id.toString()}
						name={product.name}
						description={product.tagline}
						reviewsCount={product.reviews}
						viewCount={product.views}
						votesCount={product.upvotes}
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
