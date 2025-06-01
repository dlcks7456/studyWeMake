import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-post-page";
import { Form, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserID } from "~/features/users/queries";
import { getTopics } from "../queries";
import { z } from "zod";
import { createPost } from "../mutations";
import { LoaderCircleIcon } from "lucide-react";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Submit Post | wemake" }];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { client } = makeSSRClient(request);
	await getLoggedInUserID(client);
	const topics = await getTopics(client);
	return { topics };
};

const formSchema = z.object({
	title: z.string().min(1).max(40),
	content: z.string().min(1).max(1000),
	category: z.string().min(1).max(1000),
});

export const action = async ({ request }: Route.ActionArgs) => {
	const { client } = makeSSRClient(request);
	const userId = await getLoggedInUserID(client);
	const formData = await request.formData();
	const { success, error, data } = formSchema.safeParse(
		Object.fromEntries(formData),
	);

	if (!success) {
		return {
			fieldErrors: error.flatten().fieldErrors,
		};
	}

	const { post_id } = await createPost(client, {
		title: data.title,
		content: data.content,
		category: data.category,
		userId,
	});

	return redirect(`/community/${post_id}`);
};

export default function SubmitPostPage({
	loaderData,
	actionData,
}: Route.ComponentProps) {
	const navigation = useNavigation();
	const isSubmitting =
		navigation.state === "submitting" || navigation.state === "loading";

	return (
		<div className="space-y-20">
			<Hero title="Submit Post" subtitle="Submit a post to the community" />
			<Form
				className="max-w-screen-sm mx-auto flex flex-col gap-10"
				method="post"
			>
				<InputPair
					label="Title"
					name="title"
					id="title"
					description="(40 characters max)"
					required
					placeholder="i.e What is the best productivity tool?"
				/>
				{actionData && "fieldErrors" in actionData && (
					<div className="text-red-500">
						{actionData.fieldErrors.title?.join(", ")}
					</div>
				)}
				<SelectPair
					required
					label="Category"
					name="category"
					description="Select the category of your post"
					placeholder="i.e Productivity"
					options={loaderData.topics.map((topic) => ({
						label: topic.name,
						value: topic.slug,
					}))}
				/>
				{actionData && "fieldErrors" in actionData && (
					<div className="text-red-500">
						{actionData.fieldErrors.category?.join(", ")}
					</div>
				)}
				<InputPair
					label="Content"
					name="content"
					id="content"
					description="(1000 characters max)"
					required
					placeholder="i.e I'm looking for the best productivity tool..."
					textArea
				/>
				{actionData && "fieldErrors" in actionData && (
					<div className="text-red-500">
						{actionData.fieldErrors.content?.join(", ")}
					</div>
				)}
				<Button type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? (
						<LoaderCircleIcon className="animate-spin" />
					) : (
						"Create Discussion"
					)}
				</Button>
			</Form>
		</div>
	);
}
