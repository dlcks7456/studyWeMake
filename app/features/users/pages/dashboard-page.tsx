import { ChartTooltip, type ChartConfig } from "~/common/components/ui/chart";
import { ChartTooltipContent } from "~/common/components/ui/chart";
import { CartesianGrid, Line, XAxis } from "recharts";
import { ChartContainer } from "~/common/components/ui/chart";
import type { Route } from "./+types/dashboard-page";
import { LineChart } from "recharts";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "~/common/components/ui/card";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Dashboard | WeMake" },
		{ name: "description", content: "View your dashboard" },
	];
};

const chartData = [
	{ month: "January", views: 186 },
	{ month: "February", views: 305 },
	{ month: "March", views: 237 },
	{ month: "April", views: 73 },
	{ month: "May", views: 209 },
	{ month: "June", views: 214 },
];
const chartConfig = {
	views: {
		label: "👁️",
		color: "hsl(var(--primary))",
	},
} satisfies ChartConfig;

export default function DashboardPage() {
	return (
		<div className="container py-8">
			<h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
			<Card className="w-1/2">
				<CardHeader>
					<CardTitle>Profile views</CardTitle>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig}>
						<LineChart
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
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel />}
							/>
							<Line
								dataKey="views"
								type="natural"
								stroke="var(--color-views)"
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</div>
	);
}
