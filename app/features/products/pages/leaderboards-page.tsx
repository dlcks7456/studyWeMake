import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/leaderboards-page";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Leaderboards | wemake" },
		{ name: "description", content: "Top products on wemake" },
	];
};

export default function LeaderboardsPage() {
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

				{Array.from({ length: 7 }).map((_, index) => (
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

				{Array.from({ length: 7 }).map((_, index) => (
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

				{Array.from({ length: 7 }).map((_, index) => (
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

				{Array.from({ length: 7 }).map((_, index) => (
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

				<Button variant="link" asChild className="text-lg p-0 self-center">
					<Link to="/products/leaderboards/yearly">
						Explore all products &rarr;
					</Link>
				</Button>
			</div>
		</div>
	);
}
