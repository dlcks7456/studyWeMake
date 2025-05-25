import { Form, Link, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/login-page";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";
import { LoaderCircleIcon } from "lucide-react";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "Login | wemake",
		},
	];
};

const formSchema = z.object({
	email: z
		.string({
			required_error: "Email is required",
			invalid_type_error: "Email must be a string",
		})
		.email("Invalid email"),
	password: z
		.string({
			required_error: "Password is required",
		})
		.min(8, {
			message: "Password must be at least 8 characters long",
		}),
});

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData();
	const { success, data, error } = formSchema.safeParse(
		Object.fromEntries(formData),
	);

	if (!success) {
		return {
			loginError: null,
			formErrors: error.flatten().fieldErrors,
		};
	}

	const { email, password } = data;
	const { client, headers } = makeSSRClient(request);
	const { error: loginError } = await client.auth.signInWithPassword({
		email,
		password,
	});

	if (loginError) {
		return {
			formErrors: null,
			loginError: loginError.message,
		};
	}

	return redirect("/", { headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation();
	const isSubmitting =
		navigation.state === "submitting" || navigation.state === "loading";

	return (
		<div className="flex flex-col items-center justify-center relative">
			<Button variant="ghost" asChild className="absolute right-8 top-8">
				<Link to="/auth/join">Join</Link>
			</Button>
			<div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
				<h1 className="text-2xl font-semibold">Login to your account</h1>
				<Form className="w-full space-y-4" method="post">
					<InputPair
						label="Email"
						id="email"
						description="Enter your email"
						name="email"
						type="email"
						required
						placeholder="i.e. john.doe@example.com"
					/>
					{actionData && "formErrors" in actionData && (
						<p className="text-sm text-red-500">
							{actionData.formErrors?.email?.join("\n")}
						</p>
					)}
					<InputPair
						label="Password"
						id="password"
						description="Enter your password"
						name="password"
						type="password"
						required
					/>
					{actionData && "formErrors" in actionData && (
						<p className="text-sm text-red-500">
							{actionData.formErrors?.password?.join("\n")}
						</p>
					)}
					<Button className="w-full" type="submit" disabled={isSubmitting}>
						{isSubmitting ? (
							<LoaderCircleIcon className="animate-spin" />
						) : (
							"Log in"
						)}
					</Button>
					{actionData && "loginError" in actionData && (
						<p className="text-sm text-red-500">{actionData.loginError}</p>
					)}
					<AuthButtons />
				</Form>
			</div>
		</div>
	);
}
