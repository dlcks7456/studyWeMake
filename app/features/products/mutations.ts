import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const createProductReview = async (
	client: SupabaseClient<Database>,
	{
		userId,
		productId,
		review,
		rating,
	}: { userId: string; productId: number; review: string; rating: number },
) => {
	const { data, error } = await client
		.from("reviews")
		.insert({
			profile_id: userId,
			product_id: productId,
			review,
			rating,
		})
		.select()
		.single();

	if (error) {
		throw error;
	}

	return data;
};

export const createProduct = async (
	client: SupabaseClient<Database>,
	{
		userId,
		name,
		tagline,
		description,
		howItWorks,
		url,
		iconUrl,
		category_id,
	}: {
		userId: string;
		name: string;
		tagline: string;
		description: string;
		howItWorks: string;
		url: string;
		iconUrl: string;
		category_id: number;
	},
) => {
	const { data, error } = await client
		.from("products")
		.insert({
			name,
			tagline,
			description,
			how_it_works: howItWorks,
			url,
			icon: iconUrl,
			category_id,
			profile_id: userId,
		})
		.select("product_id")
		.single();

	if (error) {
		throw error;
	}

	return data.product_id;
};
