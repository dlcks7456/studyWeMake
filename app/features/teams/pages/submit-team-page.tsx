import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-team-page";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { PRODUCT_STAGES } from "../constant";
import { getLoggedInUserID } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { createTeam } from "../mutations";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Submit Team | wemake" },
		{ name: "description", content: "Submit your team to join our community" },
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { client } = makeSSRClient(request);
	await getLoggedInUserID(client);
};

export const formSchema = z.object({
	name: z.string().max(20),
	stage: z.enum(
		PRODUCT_STAGES.map((stage) => stage.value) as [string, ...string[]],
	),
	size: z.coerce.number().min(1).max(100),
	equity: z.coerce.number().min(1).max(100),
	roles: z.string().max(200),
	description: z.string().max(200),
});

export const action = async ({ request }: Route.ActionArgs) => {
	const { client } = makeSSRClient(request);
	const formData = await request.formData();
	const userId = await getLoggedInUserID(client);
	const { success, error, data } = formSchema.safeParse(
		Object.fromEntries(formData),
	);
	if (!success) {
		return {
			fieldErrors: error.flatten().fieldErrors,
		};
	}
	const { team_id } = await createTeam({
		client,
		userId,
		data,
	});

	return redirect(`/teams/${team_id}`);
};

export default function SubmitTeamPage({ actionData }: Route.ComponentProps) {
	return (
		<div className="space-y-20">
			<Hero
				title="Create Team"
				subtitle="Create a team to join our community"
			/>
			<Form
				className="max-w-screen-2xl mx-auto flex flex-col gap-10 items-center"
				method="post"
			>
				<div className="grid grid-cols-3 gap-10 w-full">
					<InputPair
						label="What is the name of your product"
						name="name"
						placeholder="i.e My Awesome Team"
						description="(20 characters max)"
						maxLength={20}
						type="text"
						id="name"
						required
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.name?.join(", ")}
						</div>
					)}
					<SelectPair
						label="What is the stage of your product"
						name="stage"
						description="Select the stage of your product"
						required
						placeholder="Select the stage of your product"
						options={PRODUCT_STAGES.map((stage) => ({
							label: stage.label,
							value: stage.value,
						}))}
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.stage?.join(", ")}
						</div>
					)}
					<InputPair
						label="What is the size of your team"
						name="size"
						description="(1-100)"
						type="number"
						min={1}
						max={100}
						id="size"
						required
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.size?.join(", ")}
						</div>
					)}
					<InputPair
						label="How much equity are you willing to give?"
						name="equity"
						description="(each)"
						type="number"
						min={1}
						max={100}
						id="equity"
						required
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.equity?.join(", ")}
						</div>
					)}
					<InputPair
						label="What roles are you looking for?"
						placeholder="i.e React Developer, Backend Developer, Product Manager"
						name="roles"
						description="(comma separated)"
						type="text"
						id="roles"
						required
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.roles?.join(", ")}
						</div>
					)}
					<InputPair
						label="What is the description of your team?"
						placeholder="i.e We are a team of 10 people who are looking for a React Developer"
						name="description"
						description="(200 characters max)"
						maxLength={200}
						type="text"
						id="description"
						required
						textArea
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.description?.join(", ")}
						</div>
					)}
				</div>
				<Button type="submit" className="w-full max-w-sm" size="lg">
					Create Team
				</Button>
			</Form>
		</div>
	);
}
