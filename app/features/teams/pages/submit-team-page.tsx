import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-team-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Submit Team | wemake" },
		{ name: "description", content: "Submit your team to join our community" },
	];
};

export default function SubmitTeamPage() {
	return (
		<div className="space-y-20">
			<Hero
				title="Create Team"
				subtitle="Create a team to join our community"
			/>
			<Form className="max-w-screen-2xl mx-auto flex flex-col gap-10 items-center">
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
					<SelectPair
						label="What is the stage of your product"
						name="stage"
						description="Select the stage of your product"
						required
						placeholder="Select the stage of your product"
						options={[
							{ label: "Idea", value: "idea" },
							{ label: "Prototype", value: "prototype" },
							{ label: "MVP", value: "mvp" },
							{ label: "Growth", value: "growth" },
							{ label: "Mature", value: "mature" },
						]}
					/>
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
					<InputPair
						label="What roles are you looking for?"
						placeholder="i.e React Developer, Backend Developer, Product Manager"
						name="roles"
						description="(comma separated)"
						type="text"
						id="roles"
						required
					/>
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
				</div>
				<Button type="submit" className="w-full max-w-sm" size="lg">
					Create Team
				</Button>
			</Form>
		</div>
	);
}
