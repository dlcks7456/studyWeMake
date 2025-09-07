import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { insertIdeas } from "../mutations";
import { adminClient } from "~/supa-client";
import type { Route } from "./+types/generate-idea-page";

const openai = new OpenAI();

const IdeaSchema = z.object({
	title: z.string(),
	description: z.string({
		description: "A short description of the idea",
	}),
	problem: z.string(),
	solution: z.string(),
	category: z.enum(["business", "health", "education", "finance", "other"]),
});

const ResponseSchema = z.object({
	ideas: z.array(IdeaSchema).length(10),
});

export const action = async ({ request }: Route.ActionArgs) => {
	if (request.method !== "POST") {
		return new Response(null, { status: 404 });
	}

	const header = request.headers.get("X-WEMAKE");
	if (!header || header !== "X-WEMAKE") {
		return new Response(null, { status: 404 });
	}

	const completion = await openai.beta.chat.completions.parse({
		model: "gpt-4o",
		messages: [
			{
				role: "user",
				content: "Give an idea for a startup that can be build by one person",
			},
		],
		response_format: zodResponseFormat(ResponseSchema, "ideas"),
	});

	const descriptions = completion.choices[0].message.parsed?.ideas.map(
		(idea) => idea.description,
	);

	if (!descriptions) {
		return Response.json(
			{
				error: "No ideas generated",
			},
			{
				status: 400,
			},
		);
	}

	const client = adminClient;
	await insertIdeas(client, descriptions);

	return Response.json({
		ok: true,
	});
};
