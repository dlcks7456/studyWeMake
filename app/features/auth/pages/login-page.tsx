import { Form, Link } from "react-router";
import type { Route } from "./+types/login-page";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";
export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "Login | wemake",
		},
	];
};

export default function LoginPage({}: Route.ComponentProps) {
	return (
		<div className="flex flex-col items-center justify-center relative">
			<Button variant="ghost" asChild className="absolute right-8 top-8">
				<Link to="/auth/join">Join</Link>
			</Button>
			<div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
				<h1 className="text-2xl font-semibold">Login to your account</h1>
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
						label="Password"
						id="password"
						description="Enter your password"
						name="password"
						type="password"
						required
					/>
					<Button className="w-full" type="submit">
						Log in
					</Button>
					<AuthButtons />
				</Form>
			</div>
		</div>
	);
}
