import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";
import { ROLES } from "../constant";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserID, getUserByID } from "../queries";
import { z } from "zod";
import { updateUser, updateUserAvatar } from "../mutations";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "~/common/components/ui/alert";
import { CheckCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Settings | WeMake" },
		{ name: "description", content: "Manage your account settings" },
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { client } = makeSSRClient(request);
	const userId = await getLoggedInUserID(client);
	const user = await getUserByID(client, { id: userId });
	return { user };
};

const formSchema = z.object({
	name: z.string().min(1),
	role: z.string(),
	headline: z.string().optional().default(""),
	bio: z.string().optional().default(""),
});

export const action = async ({ request }: Route.ActionArgs) => {
	const { client } = makeSSRClient(request);
	const userId = await getLoggedInUserID(client);
	const formData = await request.formData();
	const avatar = formData.get("avatar");
	if (avatar && avatar instanceof File) {
		if (avatar.size <= 2097152 && avatar.type.startsWith("image/")) {
			const { data, error } = await client.storage
				.from("avatars")
				.upload(`${userId}/${Date.now()}`, avatar, {
					contentType: avatar.type,
					upsert: false,
				});

			if (error) {
				return {
					formErrors: {
						avatar: ["Failed to upload avatar"],
					},
				};
			}

			const {
				data: { publicUrl },
			} = await client.storage.from("avatars").getPublicUrl(data.path);

			await updateUserAvatar(client, {
				userId,
				avatarUrl: publicUrl,
			});
		} else {
			return {
				formErrors: {
					avatar: ["File size must be less than 2MB and must be an image"],
				},
			};
		}
	} else {
		const { success, error, data } = formSchema.safeParse(
			Object.fromEntries(formData),
		);

		if (!success) {
			return {
				formErrors: error.flatten().fieldErrors,
			};
		}

		const { name, role, headline, bio } = data;
		await updateUser(client, {
			userId,
			name,
			role: role as
				| "developer"
				| "designer"
				| "marketer"
				| "founder"
				| "product-manager"
				| "other",
			headline,
			bio,
		});

		return {
			ok: true,
		};
	}
};

export default function SettingsPage({
	loaderData,
	actionData,
}: Route.ComponentProps) {
	const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar);
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
					{actionData?.ok ? (
						<Alert>
							<AlertTitle>Success</AlertTitle>
							<AlertDescription>
								Your profile has been updated successfully
							</AlertDescription>
						</Alert>
					) : null}
					<h2 className="text-2xl font-semibold">Edit profile</h2>
					<Form className="flex flex-col gap-5 w-1/2" method="post">
						<InputPair
							label="Name"
							description="Your public name"
							name="name"
							id="name"
							placeholder="John Doe"
							defaultValue={loaderData.user.name}
							required
						/>
						{actionData?.formErrors && "name" in actionData.formErrors ? (
							<Alert variant="destructive">
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>
									{actionData.formErrors?.name?.join(", ")}
								</AlertDescription>
							</Alert>
						) : null}
						<SelectPair
							label="Role"
							description="What role do you to identify the most with"
							name="role"
							placeholder="Select your role"
							required
							options={ROLES}
							defaultValue={loaderData.user.role ?? ""}
						/>
						{actionData?.formErrors && "role" in actionData.formErrors ? (
							<Alert variant="destructive">
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>
									{actionData.formErrors?.role?.join(", ")}
								</AlertDescription>
							</Alert>
						) : null}
						<InputPair
							label="Headline"
							description="An instruction for your profile"
							name="headline"
							id="headline"
							placeholder="Headline"
							required
							textArea
							defaultValue={loaderData.user.headline ?? ""}
						/>
						{actionData?.formErrors && "headline" in actionData.formErrors ? (
							<Alert variant="destructive">
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>
									{actionData.formErrors?.headline?.join(", ")}
								</AlertDescription>
							</Alert>
						) : null}
						<InputPair
							label="Bio"
							description="Your public bio. It will be displayed on your profile."
							name="bio"
							id="bio"
							placeholder="I'm a software engineer"
							required
							textArea
							defaultValue={loaderData.user.bio ?? ""}
						/>
						{actionData?.formErrors && "bio" in actionData.formErrors ? (
							<Alert variant="destructive">
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>
									{actionData.formErrors?.bio?.join(", ")}
								</AlertDescription>
							</Alert>
						) : null}
						<Button className="w-full">Update Profile</Button>
					</Form>
				</div>
				<Form
					className="col-span-2 p-6 rounded-lg border shadow-md"
					method="post"
					encType="multipart/form-data"
				>
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
						{actionData?.formErrors && "avatar" in actionData.formErrors ? (
							<Alert variant="destructive">
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>
									{actionData.formErrors?.avatar?.join(", ")}
								</AlertDescription>
							</Alert>
						) : null}
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
				</Form>
			</div>
		</div>
	);
}
