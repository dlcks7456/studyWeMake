import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/team-page";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "~/common/components/ui/card";
import { z } from "zod";
import { getTeamById } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Team Details | wemake" },
		{
			name: "description",
			content: "Learn more about this team and their work",
		},
	];
};

const teamIdSchema = z.object({
	teamId: z.coerce.number(),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { success, data } = teamIdSchema.safeParse(params);
	const { client, headers } = makeSSRClient(request);

	if (!success) {
		throw new Response("Not Found", { status: 404 });
	}

	const team = await getTeamById(client, { teamId: data.teamId });

	return { team };
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="space-y-20">
			<Hero title={`Join ${loaderData.team.team_leader.name}'s team`} />
			<div className="grid grid-cols-6 gap-40 items-start">
				<div className="col-span-4 grid grid-cols-4 gap-5">
					{[
						{
							title: "Product Name",
							value: loaderData.team.product_name,
						},
						{
							title: "Stage",
							value: loaderData.team.product_stage,
						},
						{
							title: "Team size",
							value: loaderData.team.team_size,
						},
						{
							title: "Available equity",
							value: loaderData.team.equity_split,
						},
					].map((item) => (
						<Card>
							<CardHeader>
								<CardTitle className="text-sm font-medium text-muted-foreground">
									{item.title}
								</CardTitle>
								<CardContent className="p-0 font-bold text-2xl capitalize">
									<p>{item.value}</p>
								</CardContent>
							</CardHeader>
						</Card>
					))}
					<Card className="col-span-2">
						<CardHeader>
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Looking for
							</CardTitle>
							<CardContent className="p-0 font-bold text-2xl">
								<ul className="text-lg list-disc list-inside">
									{loaderData.team.roles.split(",").map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</CardContent>
						</CardHeader>
					</Card>
					<Card className="col-span-2">
						<CardHeader>
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Idea description
							</CardTitle>
							<CardContent className="p-0 font-medium text-xl">
								<p>{loaderData.team.product_description}</p>
							</CardContent>
						</CardHeader>
					</Card>
				</div>
				<aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-5">
					<div className="flex gap-5">
						<Avatar className="size-14">
							<AvatarFallback>
								{loaderData.team.team_leader.name[0]}
							</AvatarFallback>
							{loaderData.team.team_leader.avatar !== null ? (
								<AvatarImage src={loaderData.team.team_leader.avatar} />
							) : null}
						</Avatar>
						<div className="flex flex-col">
							<h4 className="text-lg font-medium">
								{loaderData.team.team_leader.name}
							</h4>
							<Badge
								variant="secondary"
								className="capitalize flex justify-center"
							>
								{loaderData.team.team_leader.role}
							</Badge>
						</div>
					</div>
					<Form
						method="post"
						className="space-y-5"
						action={`/users/${loaderData.team.team_leader.username}/messages`}
					>
						<InputPair
							label="Introduce your self"
							description="Tell us about yourself"
							name="content"
							id="introduction"
							placeholder="i.e I am a React Developer with 3 years of experience"
							textArea
							required
						/>
						<Button type="submit" className="w-full">
							Get in touch
						</Button>
					</Form>
				</aside>
			</div>
		</div>
	);
}
