import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Settings | WeMake" },
		{ name: "description", content: "Manage your account settings" },
	];
};

export default function SettingsPage() {
	const [avatar, setAvatar] = useState<string | null>(null);
	const onChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			setAvatar(URL.createObjectURL(file));
		}
	};
	return (
		<div className="space-y-20">
			<div className="grid grid-cols-6 gap-40">
				<div className="col-span-4 flex flex-col gap-10">
					<h2 className="text-2xl font-semibold">Edit profile</h2>
					<Form className="flex flex-col gap-5 w-1/2">
						<InputPair
							label="Name"
							description="Your public name"
							name="nama"
							id="name"
							placeholder="John Doe"
							required
						/>
						<SelectPair
							label="Role"
							description="What role do you to identify the most with"
							name="role"
							placeholder="Select your role"
							required
							options={[
								{ label: "Designer", value: "designer" },
								{ label: "Developer", value: "developer" },
								{ label: "Marketer", value: "marketer" },
								{ label: "Other", value: "other" },
							]}
						/>
						<InputPair
							label="Headline"
							description="An instruction for your profile"
							name="headline"
							id="headline"
							placeholder="Headline"
							required
							textArea
						/>
						<InputPair
							label="Bio"
							description="Your public bio. It will be displayed on your profile."
							name="bio"
							id="bio"
							placeholder="I'm a software engineer"
							required
							textArea
						/>
						<Button className="w-full">Update Profile</Button>
					</Form>
				</div>
				<aside className="col-span-2 p-6 rounded-lg border shadow-md">
					<Label className="flex flex-col gap-1">
						Avatar{" "}
						<small className="text-muted-foreground">
							This is your public avatar
						</small>
					</Label>
					<div className="space-y-5">
						<div className="size-40 rounded-full shadow-xl overflow-hidden">
							{avatar ? (
								<img src={avatar} className="object-cover w-full h-full" />
							) : null}
						</div>
						<Input
							type="file"
							className="w-1/2"
							onChange={onChangeAvatar}
							required
							name="avatar"
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
						<Button className="w-full">Update Avatar</Button>
					</div>
				</aside>
			</div>
		</div>
	);
}
