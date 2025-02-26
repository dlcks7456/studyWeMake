import { z } from "zod";
import type { Route } from "./+types/search-page";
import { Hero } from "~/common/components/hero";
import { ProductPagenation } from "~/common/components/product-pagenation";
import { ProductCard } from "../components/product-card";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Search Products | wemake" },
		{ name: "description", content: "Search for products" },
	];
};

const paramsSchema = z.object({
	query: z.string().optional().default(""),
	page: z.coerce.number().optional().default(1),
});

export function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const { success, data: parsedData } = paramsSchema.safeParse(
		Object.fromEntries(url.searchParams),
	);

	if (!success) {
		throw new Error("Invalid search parameters");
	}
}

export default function SearchPage() {
	return (
		<div className="space-y-10">
			<Hero
				title="Search"
				subtitle="Search for products by title or description"
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
