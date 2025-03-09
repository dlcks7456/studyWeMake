import type { Route } from "./+types/otp-start-page";
import { Button } from "~/common/components/ui/button";
import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";

export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "OTP | wemake",
		},
	];
};

export default function OtpStartPage({}: Route.ComponentProps) {
	return (
		<div className="flex flex-col items-center justify-center relative">
			<div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
				<div className="text-center">
					<h1 className="text-2xl font-semibold">Login with OTP</h1>
					<p className="text-sm text-muted-foreground">
						We will send you a 4-digit code to verify your account
					</p>
				</div>
				<Form className="w-full space-y-4">
					<InputPair
						label="Email"
						id="email"
						description="Enter your email"
						name="email"
						type="email"
						required
						placeholder="i.e. john.doe@example.com"
					/>
					<Button className="w-full" type="submit">
						Send OTP
					</Button>
				</Form>
			</div>
		</div>
	);
}
