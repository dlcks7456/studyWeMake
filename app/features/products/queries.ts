import type { DateTime } from "luxon";
// import { client } from "~/supa-client";
import { PAGE_SIZE } from "./constants";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const productListSelect = `
	product_id,
	name,
	tagline,
	upvotes:stats->>upvotes,
	views:stats->>views,
	reviews:stats->>reviews`;

export const getProductsByDateRange = async (
	client: SupabaseClient<Database>,
	{
		startDate,
		endDate,
		limit,
		page = 1,
	}: {
		startDate: DateTime;
		endDate: DateTime;
		limit: number;
		page?: number;
	},
) => {
	const { data, error } = await client
		.from("products")
		.select(productListSelect)
		.order("stats->>upvotes", { ascending: false })
		.gte("created_at", startDate.toISO())
		.lte("created_at", endDate.toISO())
		.range((page - 1) * limit, page * limit - 1);

	if (error) throw error;
	return data;
};

export const getProductPagesByDateRange = async (
	client: SupabaseClient<Database>,
	{
		startDate,
		endDate,
	}: {
		startDate: DateTime;
		endDate: DateTime;
	},
) => {
	const { count, error } = await client
		.from("products")
		.select(`product_id`, { count: "exact", head: true })
		.gte("created_at", startDate.toISO())
		.lte("created_at", endDate.toISO());

	if (error) throw error;
	if (!count) return 1;
	return Math.ceil(count / PAGE_SIZE);
};

export const getCategories = async (client: SupabaseClient<Database>) => {
	const { data, error } = await client
		.from("categories")
		.select(`category_id, name, description`);
	if (error) throw error;
	return data;
};

export const getCategory = async (
	client: SupabaseClient<Database>,
	{ categoryId }: { categoryId: number },
) => {
	const { data, error } = await client
		.from("categories")
		.select(`category_id, name, description`)
		.eq("category_id", categoryId)
		.single();

	if (error) throw error;
	return data;
};

export const getProductByCategory = async (
	client: SupabaseClient<Database>,
	{
		categoryId,
		page = 1,
	}: {
		categoryId: number;
		limit: number;
		page?: number;
	},
) => {
	const { data, error } = await client
		.from("products")
		.select(productListSelect)
		.eq("category_id", categoryId)
		.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

	if (error) throw error;
	return data;
};

export const getCategoryPages = async (
	client: SupabaseClient<Database>,
	{ categoryId }: { categoryId: number },
) => {
	const { count, error } = await client
		.from("products")
		.select(`product_id`, { count: "exact", head: true })
		.eq("category_id", categoryId);

	if (error) throw error;
	if (!count) return 1;
	return Math.ceil(count / PAGE_SIZE);
};

export const getProductBySearch = async (
	client: SupabaseClient<Database>,
	{
		query,
		page = 1,
	}: {
		query: string;
		page?: number;
	},
) => {
	const { data, error } = await client
		.from("products")
		.select(productListSelect)
		.or(`name.ilike.%${query}%, tagline.ilike.%${query}%`)
		.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

	if (error) throw error;

	return data;
};

export const getPagesBySearch = async (
	client: SupabaseClient<Database>,
	{ query }: { query: string },
) => {
	const { count, error } = await client
		.from("products")
		.select(`product_id`, { count: "exact", head: true })
		.or(`name.ilike.%${query}%, tagline.ilike.%${query}%`);

	if (error) throw error;
	if (!count) return 1;
	return Math.ceil(count / PAGE_SIZE);
};

export const getProductById = async (
	client: SupabaseClient<Database>,
	{ productId }: { productId: number },
) => {
	const { data, error } = await client
		.from("products_overview_view")
		.select("*")
		.eq("product_id", productId)
		.single();

	if (error) throw error;
	return data;
};

export const getReviews = async (
	client: SupabaseClient<Database>,
	{ productId }: { productId: number },
) => {
	const { data, error } = await client
		.from("reviews")
		.select(
			`
			review_id,
			rating,
			review,
			created_at,
			user:profiles!inner(name,username,avatar)
		`,
		)
		.eq("product_id", productId)
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data;
};
