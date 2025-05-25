import type { Route } from "./+types/otp-start-page";
import { Button } from "~/common/components/ui/button";
import { Form, Link, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircleIcon } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import { useState } from "react";

export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "OTP | wemake",
		},
	];
};

const formSchema = z.object({
	email: z.string().email().optional(),
	phone: z.string().optional(),
});

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData();
	const { success, data } = formSchema.safeParse(Object.fromEntries(formData));

	if (!success) {
		return {
			error: "Invalid email address or phone number",
		};
	}

	const { email, phone } = data;
	const { client } = makeSSRClient(request);

	console.log(email, phone);

	if (email !== undefined) {
		const { error: emailError } = await client.auth.signInWithOtp({
			email,
			options: {
				shouldCreateUser: true,
			},
		});

		if (emailError) {
			return {
				error: "Failed to send OTP to email",
			};
		}
	}

	if (phone !== undefined) {
		const { error: phoneError } = await client.auth.signInWithOtp({
			phone,
			options: {
				shouldCreateUser: true,
			},
		});

		if (phoneError) {
			return {
				error: phoneError.message,
			};
		}
	}

	return redirect(
		`/auth/otp/complete?${email ? `email=${email}` : `phone=${phone}`}`,
	);
};

export default function OtpStartPage({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	const [position, setPosition] = useState<"email" | "phone">("email");

	return (
		<div className="flex flex-col items-center justify-center relative">
			<div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
				<div className="text-center">
					<h1 className="text-2xl font-semibold">Login with OTP</h1>
					<p className="text-sm text-muted-foreground">
						We will send you a 6-digit code to verify your account
					</p>
				</div>
				<Form className="w-full space-y-4" method="post">
					<div className="flex flex-col gap-2">
						<p className="text-sm text-muted-foreground">
							Select the method you want to use to login
						</p>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline">
									{position === "email" ? "Email" : "Phone"}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-full">
								<DropdownMenuRadioGroup
									value={position}
									onValueChange={(value) =>
										setPosition(value as "email" | "phone")
									}
								>
									<DropdownMenuRadioItem value="email">
										Email
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="phone">
										Phone
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					{position === "email" && (
						<InputPair
							label="Email"
							id="email"
							description="Enter your email"
							name="email"
							type="email"
							required
							placeholder="i.e. john.doe@example.com"
						/>
					)}
					{position === "phone" && (
						<InputPair
							label="Phone"
							id="phone"
							required
							description="Enter your phone number"
							name="phone"
							type="tel"
							placeholder="i.e. +1234567890"
						/>
					)}
					{actionData && "error" in actionData && (
						<p className="text-red-500 text-sm">{actionData.error}</p>
					)}
					<Button className="w-full" type="submit" disabled={isSubmitting}>
						{isSubmitting ? (
							<LoaderCircleIcon className="animate-spin" />
						) : (
							"Send OTP"
						)}
					</Button>
				</Form>
			</div>
		</div>
	);
}
