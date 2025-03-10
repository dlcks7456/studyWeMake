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

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Product Management | Dashboard | WeMake" },
		{
			name: "description",
			content: "Manage your product details and settings",
		},
	];
};

const chartData = [
	{ month: "January", views: 186, visitors: 100 },
	{ month: "February", views: 305, visitors: 34 },
	{ month: "March", views: 237, visitors: 65 },
	{ month: "April", views: 73, visitors: 32 },
	{ month: "May", views: 209, visitors: 66 },
	{ month: "June", views: 214, visitors: 434 },
];
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

export default function DashboardProductPage() {
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
							data={chartData}
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
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<Area
								dataKey="views"
								type="natural"
								stroke="var(--color-views)"
								fill="var(--color-views)"
								strokeWidth={2}
								dot={false}
							/>
							<Area
								dataKey="visitors"
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
