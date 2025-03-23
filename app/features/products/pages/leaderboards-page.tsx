import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/leaderboards-page";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Link } from "react-router";
import { DateTime } from "luxon";
import { getProductsByDateRange } from "../queries";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Leaderboards | wemake" },
		{ name: "description", content: "Top products on wemake" },
	];
};

export const loader = async () => {
	const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] =
		await Promise.all([
			getProductsByDateRange({
				startDate: DateTime.now().startOf("day"),
				endDate: DateTime.now().endOf("day"),
				limit: 7,
			}),
			getProductsByDateRange({
				startDate: DateTime.now().startOf("week"),
				endDate: DateTime.now().endOf("week"),
				limit: 7,
			}),
			getProductsByDateRange({
				startDate: DateTime.now().startOf("month"),
				endDate: DateTime.now().endOf("month"),
				limit: 7,
			}),
			getProductsByDateRange({
				startDate: DateTime.now().startOf("year"),
				endDate: DateTime.now().endOf("year"),
				limit: 7,
			}),
		]);
	return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
};

export default function LeaderboardsPage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="space-y-20">
			<Hero
				title="Leaderboards"
				subtitle="The most popular products on wemake"
			/>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<h2 className="text-2xl font-bold leading-tight tracking-tight">
						Daily Leaderboard
					</h2>
					<p className="text-xl font-light text-foreground">
						The most popular products on wemake by day.
					</p>
				</div>

				{loaderData.dailyProducts.map((product) => (
					<ProductCard
						key={product.product_id}
						id={product.product_id.toString()}
						name={product.name}
						description={product.description}
						reviewsCount={product.reviews}
						viewCount={product.views}
						votesCount={product.upvotes}
					/>
				))}

				<Button variant="link" asChild className="text-lg p-0 self-center">
					<Link to="/products/leaderboards/daily">
						Explore all products &rarr;
					</Link>
				</Button>
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<h2 className="text-2xl font-bold leading-tight tracking-tight">
						Weekly Leaderboard
					</h2>
					<p className="text-xl font-light text-foreground">
						The most popular products on wemake by week.
					</p>
				</div>

				{loaderData.weeklyProducts.map((product) => (
					<ProductCard
						key={product.product_id}
						id={product.product_id.toString()}
						name={product.name}
						description={product.description}
						reviewsCount={product.reviews}
						viewCount={product.views}
						votesCount={product.upvotes}
					/>
				))}

				<Button variant="link" asChild className="text-lg p-0 self-center">
					<Link to="/products/leaderboards/weekly">
						Explore all products &rarr;
					</Link>
				</Button>
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<h2 className="text-2xl font-bold leading-tight tracking-tight">
						Monthly Leaderboard
					</h2>
					<p className="text-xl font-light text-foreground">
						The most popular products on wemake by month.
					</p>
				</div>

				{loaderData.monthlyProducts.map((product) => (
					<ProductCard
						key={product.product_id}
						id={product.product_id.toString()}
						name={product.name}
						description={product.description}
						reviewsCount={product.reviews}
						viewCount={product.views}
						votesCount={product.upvotes}
					/>
				))}

				<Button variant="link" asChild className="text-lg p-0 self-center">
					<Link to="/products/leaderboards/monthly">
						Explore all products &rarr;
					</Link>
				</Button>
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<h2 className="text-2xl font-bold leading-tight tracking-tight">
						Yearly Leaderboard
					</h2>
					<p className="text-xl font-light text-foreground">
						The most popular products on wemake by year.
					</p>
				</div>

				{loaderData.yearlyProducts.map((product) => (
					<ProductCard
						key={product.product_id}
						id={product.product_id.toString()}
						name={product.name}
						description={product.description}
						reviewsCount={product.reviews}
						viewCount={product.views}
						votesCount={product.upvotes}
					/>
				))}

				<Button variant="link" asChild className="text-lg p-0 self-center">
					<Link to="/products/leaderboards/yearly">
						Explore all products &rarr;
					</Link>
				</Button>
			</div>
		</div>
	);
}
