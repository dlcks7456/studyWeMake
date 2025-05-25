import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import type { Route } from "./+types/otp-complete-page";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircleIcon } from "lucide-react";

export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "Verify OTP | wemake",
		},
	];
};

const formSchema = z.object({
	email: z.string().email().optional(),
	phone: z.string().optional(),
	otp: z.string().length(6),
});

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData();
	const { success, data, error } = formSchema.safeParse(
		Object.fromEntries(formData),
	);

	if (!success) {
		return {
			fieldErrors: error.flatten().fieldErrors,
		};
	}

	const { email, phone, otp } = data;
	const { client, headers } = makeSSRClient(request);

	if (email) {
		const { error: verifyError } = await client.auth.verifyOtp({
			email,
			token: otp,
			type: "email",
		});

		if (verifyError) {
			return {
				verifyError: verifyError.message,
			};
		}
	} else if (phone) {
		const { error: verifyError } = await client.auth.verifyOtp({
			phone,
			token: otp,
			type: "sms",
		});

		if (verifyError) {
			return {
				verifyError: verifyError.message,
			};
		}
	}

	return redirect("/", { headers });
};

export default function OtpCompletePage({ actionData }: Route.ComponentProps) {
	const [searchParams, _] = useSearchParams();
	const email = searchParams.get("email");
	const phone = searchParams.get("phone");

	const navigation = useNavigation();
	const isSubmitting =
		navigation.state === "submitting" || navigation.state === "loading";

	return (
		<div className="flex flex-col items-center justify-center relative">
			<div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
				<div className="text-center">
					<h1 className="text-2xl font-semibold">Confirm OTP</h1>
					<p className="text-sm text-muted-foreground">
						Enter the 4-digit code sent to your email
					</p>
				</div>
				<Form className="w-full space-y-4" method="post">
					{email && (
						<>
							<InputPair
								label="Email"
								id="email"
								description="Enter your email"
								name="email"
								type="email"
								required
								placeholder="i.e. john.doe@example.com"
								defaultValue={email || ""}
							/>
							{actionData && "fieldErrors" in actionData && (
								<p className="text-red-500 text-sm">
									{actionData.fieldErrors?.email?.join("\n")}
								</p>
							)}
						</>
					)}
					{phone && (
						<>
							<InputPair
								label="Phone"
								id="phone"
								description="Enter your phone number"
								name="phone"
								type="tel"
								required
								placeholder="i.e. +1234567890"
								defaultValue={phone || ""}
							/>
							{actionData && "fieldErrors" in actionData && (
								<p className="text-red-500 text-sm">
									{actionData.fieldErrors?.phone?.join("\n")}
								</p>
							)}
						</>
					)}

					<InputPair
						label="OTP"
						id="otp"
						description="Enter the 4-digit code sent to your email"
						name="otp"
						type="number"
						required
						placeholder="i.e. 1234"
					/>
					{actionData && "fieldErrors" in actionData && (
						<p className="text-red-500 text-sm">
							{actionData.fieldErrors?.otp?.join("\n")}
						</p>
					)}

					{actionData && "verifyError" in actionData && (
						<p className="text-red-500 text-sm">{actionData.verifyError}</p>
					)}

					<Button className="w-full" type="submit" disabled={isSubmitting}>
						{isSubmitting ? (
							<LoaderCircleIcon className="animate-spin" />
						) : (
							"Verify OTP"
						)}
					</Button>
				</Form>
			</div>
		</div>
	);
}
