import { ChartTooltip, type ChartConfig } from "~/common/components/ui/chart";
import { ChartTooltipContent } from "~/common/components/ui/chart";
import { Area, CartesianGrid, XAxis } from "recharts";
import { ChartContainer } from "~/common/components/ui/chart";
import type { Route } from "./+types/dashboard-product-page";
import { AreaChart } from "recharts";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "~/common/components/ui/card";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserID } from "../queries";
import { redirect } from "react-router";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Product Management | Dashboard | WeMake" },
		{
			name: "description",
			content: "Manage your product details and settings",
		},
	];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const { client } = await makeSSRClient(request);
	const userId = await getLoggedInUserID(client);
	const { error } = await client
		.from("products")
		.select("product_id")
		.eq("profile_id", userId)
		.eq("product_id", params.productId)
		.single();

	if (error) {
		throw redirect("/my/dashboard/products");
	}

	const { data, error: rpcError } = await client.rpc("get_product_stats", {
		product_id: params.productId,
	});

	if (rpcError) {
		throw rpcError;
	}
	return { chartData: data };
};

const chartConfig = {
	views: {
		label: "Page Views",
		color: "hsl(var(--chart-1))",
	},
	visitors: {
		label: "Visitors",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export default function DashboardProductPage({
	loaderData,
}: Route.ComponentProps) {
	return (
		<div className="container py-8">
			<h1 className="text-2xl font-semibold mb-6">Analytics</h1>
			<Card className="w-1/2">
				<CardHeader>
					<CardTitle>Performance</CardTitle>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig}>
						<AreaChart
							accessibilityLayer
							data={loaderData.chartData}
							margin={{
								left: 12,
								right: 12,
							}}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								padding={{ left: 15, right: 15 }}
							/>
							<Area
								dataKey="product_views"
								type="natural"
								stroke="var(--color-views)"
								fill="var(--color-views)"
								strokeWidth={2}
								dot={false}
							/>
							<Area
								dataKey="product_visits"
								type="natural"
								stroke="var(--color-visitors)"
								fill="var(--color-visitors)"
								strokeWidth={2}
								dot={false}
								fillOpacity={0.4}
							/>
							<ChartTooltip
								cursor={false}
								wrapperStyle={{
									minWidth: "200px",
								}}
								content={<ChartTooltipContent indicator="line" />}
							/>
						</AreaChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</div>
	);
}
