import { Form, Link } from "react-router";
import type { Route } from "./+types/social-complete-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";

export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "Join | wemake",
		},
	];
};

export default function JoinPage({}: Route.ComponentProps) {
	return (
		<div className="flex flex-col items-center justify-center relative">
			<Button variant="ghost" asChild className="absolute right-8 top-8">
				<Link to="/auth/login">Login</Link>
			</Button>
			<div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
				<h1 className="text-2xl font-semibold">Create an account</h1>
				<Form className="w-full space-y-4">
					<InputPair
						label="Name"
						id="name"
						description="Enter your name"
						name="name"
						type="text"
						required
						placeholder="i.e. John Doe"
					/>
					<InputPair
						label="Username"
						id="username"
						description="Enter your username"
						name="username"
						type="text"
						required
						placeholder="i.e. john_doe"
					/>
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
						Create account
					</Button>
					<AuthButtons />
				</Form>
			</div>
		</div>
	);
}
