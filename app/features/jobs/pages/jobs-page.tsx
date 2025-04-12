import { Button } from "~/common/components/ui/button";
import { JobCard } from "../components/job-card";
import type { Route } from "./+types/jobs-page";
import { Hero } from "~/common/components/hero";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constant";
import { data, Link, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { getJobs } from "../queries";
import { z } from "zod";
import { X } from "lucide-react";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Jobs | webake" },
		{ name: "description", content: "Find your dream job at wemake" },
	];
};

const searchParamsSchema = z.object({
	type: z
		.enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]])
		.optional(),
	location: z
		.enum(
			LOCATION_TYPES.map((location) => location.value) as [string, ...string[]],
		)
		.optional(),
	salary: z.enum(SALARY_RANGE as [string, ...string[]]).optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url);
	const { success, data: parsedData } = searchParamsSchema.safeParse(
		Object.fromEntries(url.searchParams),
	);

	if (!success) {
		throw data(
			{
				error_code: "INVALID_SEARCH_PARAMS",
				error_message: "Invalid search params",
				details: parsedData,
			},
			{ status: 400 },
		);
	}

	const jobs = await getJobs({
		limit: 40,
		type: parsedData.type,
		location: parsedData.location,
		salary: parsedData.salary,
	});

	return { jobs };
};

export default function JobsPage({ loaderData }: Route.ComponentProps) {
	const [searchParams, setSearchParams] = useSearchParams();

	const onFilterClick = (key: string, value: string) => {
		searchParams.set(key, value);
		setSearchParams(searchParams);
	};

	return (
		<div className="space-y-20">
			<Hero title="Jobs" subtitle="Companies looking for makers" />
			<div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-5">
					{loaderData.jobs.map((job) => (
						<JobCard
							key={job.job_id}
							id={job.job_id}
							company={job.company_name}
							companyLogoUrl={job.company_logo}
							companyHq={job.location}
							title={job.position}
							postedAt={job.created_at}
							type={job.job_type}
							positionLocation={job.location}
							salary={job.salary_range}
						/>
					))}
				</div>
				<div className="xl:col-span-2 flex flex-col gap-10 sticky top-20">
					<div className="flex flex-col gap-2.5 items-start">
						<h4 className="text-sm text-muted-foreground font-bold flex items-center justify-center">
							<p className="flex items-center justify-center">Type</p>
							<p
								className={cn(
									"flex items-center justify-center transition-opacity duration-300",
									searchParams.get("type")
										? "opacity-100 cursor-pointer"
										: "opacity-0 pointer-events-none",
								)}
								onClick={() => {
									searchParams.delete("type");
									setSearchParams(searchParams);
								}}
							>
								<X className="size-5" />
							</p>
						</h4>
						<div className="flex flex-wrap gap-2">
							{JOB_TYPES.map((type) => (
								<Button
									variant={"outline"}
									key={type.value}
									onClick={() => {
										onFilterClick("type", type.value);
									}}
									className={cn(
										type.value === searchParams.get("type") ? "bg-accent" : "",
									)}
								>
									{type.label}
								</Button>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-2.5 items-start">
						<h4 className="text-sm text-muted-foreground font-bold flex items-center justify-center">
							<p className="flex items-center justify-center">Location</p>
							<p
								className={cn(
									"flex items-center justify-center transition-opacity duration-300",
									searchParams.get("location")
										? "opacity-100 cursor-pointer"
										: "opacity-0 pointer-events-none",
								)}
								onClick={() => {
									searchParams.delete("location");
									setSearchParams(searchParams);
								}}
							>
								<X className="size-5" />
							</p>
						</h4>
						<div className="flex flex-wrap gap-2">
							{LOCATION_TYPES.map((location) => (
								<Button
									variant={"outline"}
									key={location.value}
									onClick={() => {
										onFilterClick("location", location.value);
									}}
									className={cn(
										location.value === searchParams.get("location")
											? "bg-accent"
											: "",
									)}
								>
									{location.label}
								</Button>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-2.5 items-start">
						<h4 className="text-sm text-muted-foreground font-bold flex items-center justify-center">
							<p className="flex items-center justify-center">Salary</p>
							<p
								className={cn(
									"flex items-center justify-center transition-opacity duration-300",
									searchParams.get("salary")
										? "opacity-100 cursor-pointer"
										: "opacity-0 pointer-events-none",
								)}
								onClick={() => {
									searchParams.delete("salary");
									setSearchParams(searchParams);
								}}
							>
								/
								<X className="size-5" />
							</p>
						</h4>
						<div className="flex flex-wrap gap-2">
							{SALARY_RANGE.map((salary) => (
								<Button
									variant={"outline"}
									key={salary}
									onClick={() => {
										onFilterClick("salary", salary);
									}}
									className={cn(
										salary === searchParams.get("salary") ? "bg-accent" : "",
									)}
								>
									{salary}
								</Button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
