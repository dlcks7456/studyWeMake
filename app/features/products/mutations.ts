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
