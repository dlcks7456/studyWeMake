import { Form, Link, type MetaFunction } from "react-router";
import type { Route } from ".react-router/types/app/+types/root";
import { Hero } from "~/common/components/hero";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import type { DateRange } from "react-day-picker";
import { useState } from "react";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";

export const meta: MetaFunction = () => {
	return [
		{ title: "Promote Product | wemake" },
		{ name: "description", content: "Promote your product" },
	];
};

export default function PromotePage() {
	const [promotionPeriod, setPromotionPeriod] = useState<
		DateRange | undefined
	>();

	const totalDays =
		promotionPeriod?.from && promotionPeriod?.to
			? DateTime.fromJSDate(promotionPeriod.to).diff(
					DateTime.fromJSDate(promotionPeriod.from),
					"days",
			  ).days
			: 0;

	return (
		<div>
			<Hero
				title="Promote Your Product"
				subtitle="Boost your product's visibility."
			/>
			<Form className="max-w-sm mx-auto flex flex-col gap-10 items-center">
				<SelectPair
					label="Select a product"
					description="Select the product you want to promote"
					placeholder="Select a product"
					options={[
						{ label: "AI Dark mode maker", value: "ai-dark-mode-maker-1" },
						{ label: "AI Dark mode maker", value: "ai-dark-mode-maker-2" },
						{ label: "AI Dark mode maker", value: "ai-dark-mode-maker-3" },
					]}
					name="product"
					required
				/>
				<div className="flex flex-col gap-4 items-center w-full">
					<Label className="flex flex-col gap-1">
						Select a range of dates for promotion{" "}
						<small className="text-muted-foreground text-center">
							Minimum duration is 3 days
						</small>
					</Label>
					<Calendar
						mode="range"
						selected={promotionPeriod}
						onSelect={setPromotionPeriod}
						min={3}
						disabled={{
							before: new Date(),
						}}
					/>
				</div>
				<Button disabled={totalDays === 0}>
					Goto checkout (${totalDays * 10})
				</Button>
			</Form>
		</div>
	);
}
