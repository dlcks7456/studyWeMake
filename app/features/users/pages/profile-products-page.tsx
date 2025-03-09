import { ProductCard } from "~/features/products/components/product-card";

export default function ProfileProductsPage() {
	return (
		<div className="flex flex-col gap-5">
			{Array.from({ length: 5 }).map((_, index) => (
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
	);
}
