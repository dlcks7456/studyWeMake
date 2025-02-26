import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import { Label } from "@radix-ui/react-label";
import { Input } from "~/common/components/ui/input";
import InputPair from "~/common/components/input-pair";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/common/components/ui/select";
import SelectPair from "~/common/components/select-pair";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Submit Product | wemake" },
		{ name: "description", content: "Submit your product to wemake" },
	];
};

export default function SubmitPage({ actionData }: Route.ComponentProps) {
	return (
		<div>
			<Hero
				title="Submit Your Product"
				subtitle="Share your product with the world"
			/>
			<Form className="grid grid-cols-2 gap-10 max-w-screen-md mx-auto">
				<div className="space-y-5">
					<InputPair
						label="Name"
						description="This is the name of your product"
						id="name"
						name="name"
						type="text"
						required
						placeholder="Name of your product"
					/>
					<InputPair
						label="Tagline"
						description="(60 characters or less)"
						id="tagline"
						name="tagline"
						type="text"
						required
						placeholder="A concise tagline for your product"
					/>
					<InputPair
						label="URL"
						description="The URL of your product"
						id="url"
						name="url"
						type="url"
						required
						placeholder="https://example.com"
					/>
					<InputPair
						textArea
						label="Description"
						description="A detailed description of your product"
						id="description"
						name="description"
						type="text"
						required
						placeholder="A detailed description of your product"
					/>
					<SelectPair
						label="Category"
						description="The category of your product"
						name="category"
						required
						placeholder="Select a category"
						options={[
							{ label: "Value 1", value: "1" },
							{ label: "Value 2", value: "2" },
							{ label: "Value 3", value: "3" },
						]}
					/>
				</div>
			</Form>
		</div>
	);
}
