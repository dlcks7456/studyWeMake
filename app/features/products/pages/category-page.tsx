import { Form } from "react-router";
import type { Route } from "./+types/category-page";
import { Hero } from "~/common/components/hero";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import { ProductPagenation } from "~/common/components/product-pagenation";
import {
	getCategory,
	getCategoryPages,
	getProductByCategory,
} from "../queries";
import { z } from "zod";
import { PAGE_SIZE } from "../constants";

export const meta: Route.MetaFunction = ({ params }) => {
	const category = params.category;
	return [
		{ title: `${category} | wemake` },
		{ name: "description", content: `Browse ${category} products` },
	];
};

const paramsSchema = z.object({
	category: z.coerce.number(),
	page: z.coerce.number().optional().default(1),
});

export const loader = async ({ params }: Route.LoaderArgs) => {
	const { data, success } = paramsSchema.safeParse(params);
	if (!success) {
		throw new Response("Invalid category", { status: 400 });
	}

	const products = await getProductByCategory({
		categoryId: data.category,
		limit: PAGE_SIZE,
		page: data.page,
	});

	const totalPage = await getCategoryPages({
		categoryId: data.category,
	});

	const category = await getCategory({ categoryId: data.category });
	return { category, products, totalPage };
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="space-y-10">
			<Hero
				title={loaderData.category.name}
				subtitle={loaderData.category.description}
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
				{loaderData.products.map((product) => (
					<ProductCard
						key={product.product_id}
						id={product.product_id}
						name={product.name}
						description={product.tagline}
						reviewsCount={Number(product.reviews)}
						viewCount={Number(product.views)}
						votesCount={Number(product.upvotes)}
					/>
				))}
			</div>
			<ProductPagenation totalPages={loaderData.totalPage} />
		</div>
	);
}
