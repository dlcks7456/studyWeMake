import { ProductCard } from "~/features/products/components/product-card";
import { getUserProducts } from "../queries";
import type { Route } from "./+types/profile-products-page";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { client, headers } = makeSSRClient(request);
	const products = await getUserProducts(client, {
		username: params.username,
	});
	return { products };
};

export default function ProfileProductsPage({
	loaderData,
}: Route.ComponentProps) {
	return (
		<div className="flex flex-col gap-5">
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
	);
}
