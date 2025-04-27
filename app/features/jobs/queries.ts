import { client } from "~/supa-client";

export const getJobs = async ({
	limit,
	type,
	location,
	salary,
}: {
	limit: number;
	type?: string;
	location?: string;
	salary?: string;
}) => {
	const baseQuery = client
		.from("jobs")
		.select(
			`
            job_id,
            position,
            overview,
            company_name,
            company_logo,
            company_location,
            job_type,
            location,
            salary_range,
            created_at
            `,
		)
		.limit(limit);

	if (location) {
		baseQuery.eq("location", location);
	}

	if (salary) {
		baseQuery.eq("salary_range", salary);
	}

	if (type) {
		baseQuery.eq("job_type", type);
	}

	const { data, error } = await baseQuery;

	if (error) {
		throw error;
	}

	return data;
};

export const getJobById = async ({ jobId }: { jobId: number }) => {
	const { data, error } = await client
		.from("jobs")
		.select("*")
		.eq("job_id", jobId)
		.single();

	if (error) throw error;

	return data;
};
