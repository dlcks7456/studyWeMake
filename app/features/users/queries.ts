import type { SupabaseClient } from "@supabase/supabase-js";
import { productListSelect } from "../products/queries";
import { type Database } from "~/supa-client";
import { redirect } from "react-router";

export const getUserProfile = async (
	client: SupabaseClient<Database>,
	{ username }: { username: string },
) => {
	const { data, error } = await client
		.from("profiles")
		.select(
			`
        profile_id,
        name,
        username,
        avatar,
        role,
        headline,
        bio
        `,
		)
		.eq("username", username)
		.single();

	if (error) throw new Error(error.message);
	return data;
};

export const getUserByID = async (
	client: SupabaseClient<Database>,
	{ id }: { id: string },
) => {
	const { data, error } = await client
		.from("profiles")
		.select(
			`
        profile_id,
        name,
        username,
        avatar,
        role,
        headline,
        bio
        `,
		)
		.eq("profile_id", id)
		.single();

	if (error) throw new Error(error.message);
	return data;
};

export const getUserProducts = async (
	client: SupabaseClient<Database>,
	{ username }: { username: string },
) => {
	const { data, error } = await client
		.from("products")
		.select(
			`
            ${productListSelect},
            profiles!products_to_profiles!inner (
                profile_id
            )
            `,
		)
		.eq("profiles.username", username);

	if (error) throw new Error(error.message);
	return data;
};

export const getUserPosts = async (
	client: SupabaseClient<Database>,
	{ username }: { username: string },
) => {
	const { data, error } = await client
		.from("community_post_list_view")
		.select("*")
		.eq("author_username", username);

	if (error) throw new Error(error.message);
	return data;
};

export const getLoggedInUserID = async (client: SupabaseClient<Database>) => {
	const { data, error } = await client.auth.getUser();
	if (error || data.user === null) {
		throw redirect("/auth/login");
	}
	return data.user.id;
};

export const getClaimedIdeas = async (
	client: SupabaseClient<Database>,
	{ userId }: { userId: string },
) => {
	const { data, error } = await client
		.from("gpt_ideas")
		.select(`gpt_idea_id, claimed_at, idea`)
		.eq("claimed_by", userId);

	if (error) {
		throw error;
	}

	return data;
};

export const getProductsByUserId = async (
	client: SupabaseClient<Database>,
	{ userId }: { userId: string },
) => {
	const { data, error } = await client
		.from("products")
		.select(`name, product_id`)
		.eq("profile_id", userId);

	if (error) throw new Error(error.message);
	return data;
};

export const getNotifications = async (
	client: SupabaseClient<Database>,
	{ userId }: { userId: string },
) => {
	const { data, error } = await client
		.from("notifications")
		.select(
			`
			notification_id,
			type,
			source:profiles!source_id(
				profile_id,
				name,
				avatar
			),
			product:products!product_id(
				product_id,
				name
			),
			post:posts!post_id(
				post_id,
				title
			),
			seen,
			created_at
			`,
		)
		.eq("target_id", userId)
		.order("created_at", { ascending: false });

	if (error) {
		throw error;
	}

	return data;
};

export const countNotifications = async (
	client: SupabaseClient<Database>,
	{ userId }: { userId: string },
) => {
	const { count, error } = await client
		.from("notifications")
		.select("*", { count: "exact", head: true })
		.eq("seen", false)
		.eq("target_id", userId);

	if (error) {
		throw error;
	}

	return count ?? 0;
};
