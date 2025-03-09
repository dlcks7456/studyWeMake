import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-product-page";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";
export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Submit Product | wemake" },
		{ name: "description", content: "Submit your product to wemake" },
	];
};

export default function SubmitPage({ actionData }: Route.ComponentProps) {
	const [icon, setIcon] = useState<string | null>(null);
	const onChangeIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			setIcon(URL.createObjectURL(file));
		}
	};

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
					<Button type="submit" className="w-full" size="lg">
						Submit
					</Button>
				</div>
				<div className="flex flex-col space-y-2">
					<div className="size-40 rounded-xl shadow-xl overflow-hidden">
						{icon ? (
							<img src={icon} className="object-cover w-full h-full" />
						) : null}
					</div>
					<Label className="flex flex-col gap-1">
						Icon{" "}
						<small className="text-muted-foreground">
							This is the icon of your product
						</small>
					</Label>
					<Input
						type="file"
						className="w-1/2"
						onChange={onChangeIcon}
						required
						name="icon"
					/>
					<div className="flex flex-col text-xs">
						<span className="text-muted-foreground">
							Recommend size: 128x128px
						</span>
						<span className="text-muted-foreground">
							Allowed format: PNG, JPEG
						</span>
						<span className="text-muted-foreground">Max file size: 1MB</span>
					</div>
				</div>
			</Form>
		</div>
	);
}
