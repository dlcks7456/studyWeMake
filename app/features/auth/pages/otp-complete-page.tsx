import { Form } from "react-router";
import type { Route } from "./+types/otp-complete-page";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";

export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "Verify OTP | wemake",
		},
	];
};

export default function OtpCompletePage({}: Route.ComponentProps) {
	return (
		<div className="flex flex-col items-center justify-center relative">
			<div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
				<div className="text-center">
					<h1 className="text-2xl font-semibold">Confirm OTP</h1>
					<p className="text-sm text-muted-foreground">
						Enter the 4-digit code sent to your email
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
					<InputPair
						label="OTP"
						id="otp"
						description="Enter the 4-digit code sent to your email"
						name="otp"
						type="number"
						required
						placeholder="i.e. 1234"
					/>
					<Button className="w-full" type="submit">
						Log in
					</Button>
				</Form>
			</div>
		</div>
	);
}
