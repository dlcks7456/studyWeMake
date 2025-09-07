import { Form, Link, type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import type { DateRange } from "react-day-picker";
import { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";
import { getProductsByUser } from "../queries";
import type { Route } from "./+types/promote-page";
import { getLoggedInUserID } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { ArrowBigLeft } from "lucide-react";
import {
	loadTossPayments,
	type TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";

export const meta: MetaFunction = () => {
	return [
		{ title: "Promote Product | wemake" },
		{ name: "description", content: "Promote your product" },
	];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { client } = await makeSSRClient(request);
	const userId = await getLoggedInUserID(client);
	const products = await getProductsByUser(client, { userId });
	return { products, userId };
};

export default function PromotePage({ loaderData }: Route.ComponentProps) {
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

	const widgets = useRef<TossPaymentsWidgets | null>(null);
	const initedToss = useRef<boolean>(false);

	useEffect(() => {
		const initToss = async () => {
			if (initedToss.current) return;
			initedToss.current = true;
			const toss = await loadTossPayments(
				"test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm",
			);
			widgets.current = await (
				await toss
			).widgets({
				customerKey: loaderData.userId,
			});

			await widgets.current.setAmount({
				value: 10000,
				currency: "KRW",
			}); // 결제 금액 설정

			await widgets.current.renderPaymentMethods({
				selector: "#toss-payment-methods",
				variantKey: "DEFAULT",
			}); // 결제 방법 렌더링

			await widgets.current.renderAgreement({
				selector: "#toss-payment-agreement",
			}); // 결제 동의 렌더링
		};
		initToss();
	}, []);

	useEffect(() => {
		// if (widgets.current) {
		// 	widgets.current.setAmount({
		// 		value: totalDays * 20000,
		// 		currency: "KRW",
		// 	});
		// }
		const updateAmount = async () => {
			if (widgets.current) {
				await widgets.current.setAmount({
					value: totalDays * 20000,
					currency: "KRW",
				});
			}
		};

		updateAmount();
	}, [promotionPeriod]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const product = formData.get("product") as string;
		if (!product || !promotionPeriod?.to || !promotionPeriod?.from) return;

		await widgets.current?.requestPayment({
			orderId: crypto.randomUUID(),
			orderName: `WeMake Promotion for ${product}`,
			customerEmail: "test@test.co",
			customerName: "test",
			customerMobilePhone: "01012345678",
			metadata: {
				product,
				promotionFrom: DateTime.fromJSDate(promotionPeriod.from).toISO(),
				promotionTo: DateTime.fromJSDate(promotionPeriod.to).toISO(),
			},
			successUrl: `${window.location.href}/success`,
			failUrl: `${window.location.href}/fail`,
		});
	};

	return (
		<div>
			<Hero
				title="Promote Your Product"
				subtitle="Boost your product's visibility."
			/>
			<form onSubmit={handleSubmit} className="grid grid-cols-6 gap-10">
				<div className="col-span-3 w-1/2 mx-auto flex flex-col items-start gap-10">
					<SelectPair
						required
						label="Select a product"
						description="Select the product you want to promote"
						placeholder="Select a product"
						options={loaderData.products.map((product) => {
							return {
								label: product.name,
								value: product.product_id.toString(),
							};
						})}
						name="product"
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
				</div>
				<aside className="col-span-3 px-20 flex flex-col items-center">
					<div id="toss-payment-methods" className="w-full" />
					<div id="toss-payment-agreement" />
					<Button disabled={totalDays === 0} className="w-full">
						Checkout (
						{(totalDays * 20000).toLocaleString("ko-KR", {
							style: "currency",
							currency: "KRW",
						})}
						)
					</Button>
				</aside>
			</form>
		</div>
	);
}
