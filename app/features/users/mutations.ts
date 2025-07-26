import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const updateUser = async (
	client: SupabaseClient<Database>,
	{
		userId,
		name,
		role,
		headline,
		bio,
	}: {
		userId: string;
		name: string;
		role:
			| "developer"
			| "designer"
			| "marketer"
			| "founder"
			| "product-manager"
			| "other";
		headline: string | null;
		bio: string | null;
	},
) => {
	const { error } = await client
		.from("profiles")
		.update({ name, role, headline, bio })
		.eq("profile_id", userId);

	if (error) {
		throw error;
	}
};

export const updateUserAvatar = async (
	client: SupabaseClient<Database>,
	{
		userId,
		avatarUrl,
	}: {
		userId: string;
		avatarUrl: string;
	},
) => {
	const { data, error } = await client
		.from("profiles")
		.update({ avatar: avatarUrl })
		.eq("profile_id", userId);

	if (error) {
		throw error;
	}
};

export const seeNotification = async (
	client: SupabaseClient<Database>,
	{ userId, notificationId }: { userId: string; notificationId: string },
) => {
	const { error } = await client
		.from("notifications")
		.update({ seen: true })
		.eq("notification_id", notificationId)
		.eq("target_id", userId);

	if (error) {
		throw error;
	}
};
