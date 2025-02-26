import { Form } from "react-router";
import type { Route } from "./+types/category-page";
import { Hero } from "~/common/components/hero";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import { ProductPagenation } from "~/common/components/product-pagenation";

export const meta: Route.MetaFunction = ({ params }) => {
	const category = params.category;
	return [
		{ title: `${category} | wemake` },
		{ name: "description", content: `Browse ${category} products` },
	];
};

export default function CategoryPage() {
	return (
		<div className="space-y-10">
			<Hero
				title="Developer Tools"
				subtitle="Tools for developers to build better products"
			/>
			<Form className="flex justify-center max-w-screen-sm items-center mx-auto gap-2">
				<Input
					name="query"
					placeholder="Search for products"
					className="text-lg"
				/>
				<Button type="submit">Search</Button>
			</Form>
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
