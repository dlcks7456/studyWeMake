import { Form, Link, redirect, useNavigation } from "react-router";

import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { checkUsernameExists } from "../queries";
import type { Route } from "./+types/join-page";
import { LoaderCircleIcon } from "lucide-react";
export const meta: Route.MetaFunction = () => {
	return [
		{
			title: "Join | wemake",
		},
	];
};

const formSchema = z.object({
	name: z.string().min(3, { message: "Name must be at least 3 characters" }),
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData();
	const { success, data, error } = formSchema.safeParse(
		Object.fromEntries(formData),
	);

	if (!success) {
		return {
			formErrors: error.flatten().fieldErrors,
		};
	}
	const usernameExists = await checkUsernameExists(request, {
		username: data.username,
	});

	if (usernameExists) {
		return {
			formErrors: { username: ["Username already exists"] },
		};
	}

	const { client, headers } = makeSSRClient(request);
	const { error: signUpError } = await client.auth.signUp({
		email: data.email,
		password: data.password,
		options: {
			// 커스텀 데이터
			data: { name: data.name, username: data.username },
		},
	});

	if (signUpError) {
		return {
			signUpError: signUpError.message,
		};
	}

	return redirect("/", { headers });
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation();
	const isSubmitting =
		navigation.state === "submitting" || navigation.state === "loading";
	return (
		<div className="flex flex-col items-center justify-center relative">
			<Button variant="ghost" asChild className="absolute right-8 top-8">
				<Link to="/auth/login">Login</Link>
			</Button>
			<div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
				<h1 className="text-2xl font-semibold">Create an account</h1>
				<Form className="w-full space-y-4" method="post">
					<InputPair
						label="Name"
						id="name"
						description="Enter your name"
						name="name"
						type="text"
						required
						placeholder="i.e. John Doe"
					/>
					{actionData && "formErrors" in actionData && (
						<p className="text-red-500">{actionData?.formErrors?.name}</p>
					)}
					<InputPair
						label="Username"
						id="username"
						description="Enter your username"
						name="username"
						type="text"
						required
						placeholder="i.e. john_doe"
					/>
					{actionData && "formErrors" in actionData && (
						<p className="text-red-500">{actionData?.formErrors?.username}</p>
					)}
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
						<p className="text-red-500">{actionData?.formErrors?.email}</p>
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
						<p className="text-red-500">{actionData?.formErrors?.password}</p>
					)}
					<Button className="w-full" type="submit" disabled={isSubmitting}>
						{isSubmitting ? (
							<LoaderCircleIcon className="animate-spin" />
						) : (
							"Create account"
						)}
					</Button>
					{actionData && "signUpError" in actionData && (
						<p className="text-red-500">{actionData.signUpError}</p>
					)}
					<AuthButtons />
				</Form>
			</div>
		</div>
	);
}
