import { ChevronUpIcon, StarIcon } from "lucide-react";
import type { Route } from "./+types/product-overview-page";
import { Button } from "~/common/components/ui/button";
import { Link, useOutletContext } from "react-router";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Product Overview | wemake" },
		{ name: "description", content: "Product Overview" },
	];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { client, headers } = makeSSRClient(request);
	await client.rpc("track_event", {
		event_type: "product_view",
		event_data: {
			product_id: params.productId,
		},
	});
};

export default function ProductOverviewPage() {
	const { description, how_it_works } = useOutletContext<{
		product_id: number;
		description: string;
		how_it_works: string;
	}>();
	return (
		<div className="space-y-10">
			<div className="space-y-1">
				<h3 className="text-lg font-bold">What is this product?</h3>
				<p className="text-muted-foreground">{description}</p>
			</div>
			<div className="space-y-1">
				<h3 className="text-lg font-bold">How does it work?</h3>
				<p className="text-muted-foreground">{how_it_works}</p>
			</div>
		</div>
	);
}
