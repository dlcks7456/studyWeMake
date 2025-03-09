import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-post-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Submit Post | wemake" }];
}

export default function SubmitPostPage() {
	return (
		<div className="space-y-20">
			<Hero title="Submit Post" subtitle="Submit a post to the community" />
			<Form className="max-w-screen-sm mx-auto flex flex-col gap-10">
				<InputPair
					label="Title"
					name="title"
					id="title"
					description="(40 characters max)"
					required
					placeholder="i.e What is the best productivity tool?"
				/>
				<SelectPair
					required
					label="Category"
					name="category"
					description="Select the category of your post"
					placeholder="i.e Productivity"
					options={[
						{ label: "Productivity", value: "productivity" },
						{ label: "Programming", value: "programming" },
						{ label: "Design", value: "design" },
						{ label: "Marketing", value: "marketing" },
						{ label: "Other", value: "other" },
					]}
				/>
				<InputPair
					label="Content"
					name="content"
					id="content"
					description="(1000 characters max)"
					required
					placeholder="i.e I'm looking for the best productivity tool..."
					textArea
				/>
				<Button type="submit" className="mx-auto">
					Create Discussion
				</Button>
			</Form>
		</div>
	);
}
