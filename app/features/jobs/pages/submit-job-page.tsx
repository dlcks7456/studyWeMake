import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-job-page";
import { Button } from "~/common/components/ui/button";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constant";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserID } from "~/features/users/queries";
import { z } from "zod";
import { createJob } from "../mutations";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Post a Job | webake" },
		{ name: "description", content: "Post a new job listing on webake" },
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { client } = makeSSRClient(request);
	await getLoggedInUserID(client);
};

export const formSchema = z.object({
	position: z.string().max(40),
	overview: z.string().max(400),
	responsibilities: z.string().max(400),
	qualifications: z.string().max(400),
	benefits: z.string().max(400),
	skills: z.string().max(400),
	companyName: z.string().max(40),
	companyLogoUrl: z.string().max(40),
	companyLocation: z.string().max(40),
	applyUrl: z.string().max(40),
	jobType: z.enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]]),
	jobLocation: z.enum(
		LOCATION_TYPES.map((type) => type.value) as [string, ...string[]],
	),
	salaryRange: z.enum(SALARY_RANGE),
});

export const action = async ({ request }: Route.ActionArgs) => {
	const { client } = makeSSRClient(request);
	await getLoggedInUserID(client);

	const formData = await request.formData();
	const { success, error, data } = formSchema.safeParse(
		Object.fromEntries(formData),
	);

	if (!success) {
		return {
			fieldErrors: error.flatten().fieldErrors,
		};
	}

	const { job_id } = await createJob(client, data);

	return redirect(`/jobs/${job_id}`);
};

export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
	return (
		<div>
			<Hero title="Post a Job" subtitle="Post a new job listing on webake" />
			<Form
				className="max-w-screen-2xl mx-auto flex flex-col gap-10 items-center"
				method="post"
			>
				<div className="grid grid-cols-3 gap-10 w-full">
					<InputPair
						label="Position"
						description="(40 characters max)"
						name="position"
						id="position"
						maxLength={40}
						type="text"
						required
						placeholder="i.e Software Engineer"
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.position?.join(", ")}
						</div>
					)}
					<InputPair
						label="Overview"
						description="(400 characters max)"
						name="overview"
						id="overview"
						maxLength={400}
						type="text"
						required
						placeholder="i.e we are looking for a senior frontend developer who is proficient in React, TypeScript, and Next.js."
						textArea
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.overview?.join(", ")}
						</div>
					)}
					<InputPair
						label="Responsibilities"
						description="(400 characters max, comma separated)"
						name="responsibilities"
						id="responsibilities"
						maxLength={400}
						type="text"
						required
						placeholder="i.e Design, build, and ship features and components"
						textArea
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.responsibilities?.join(", ")}
						</div>
					)}
					<InputPair
						label="Qualifications"
						description="(400 characters max, comma separated)"
						name="qualifications"
						id="qualifications"
						maxLength={400}
						type="text"
						required
						placeholder="i.e Bachelor's degree in Computer Science or related field"
						textArea
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.qualifications?.join(", ")}
						</div>
					)}
					<InputPair
						label="Benefits"
						description="(400 characters max, comma separated)"
						name="benefits"
						id="benefits"
						maxLength={400}
						type="text"
						required
						placeholder="i.e Flexible working hours, Remote work, Health insurance, Dental insurance, Vision insurance, 401(k) plan, Stock options"
						textArea
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.benefits?.join(", ")}
						</div>
					)}
					<InputPair
						label="Skills"
						description="(400 characters max, comma separated)"
						name="skills"
						id="skills"
						maxLength={400}
						type="text"
						required
						placeholder="i.e React, TypeScript, Next.js"
						textArea
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.skills?.join(", ")}
						</div>
					)}
					<InputPair
						label="Company Name"
						description="(40 characters max)"
						name="companyName"
						id="companyName"
						maxLength={40}
						type="text"
						required
						placeholder="i.e Meta Inc."
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.companyName?.join(", ")}
						</div>
					)}
					<InputPair
						label="Company Logo URL"
						description="(40 characters max)"
						name="companyLogoUrl"
						id="companyLogoUrl"
						type="url"
						required
						placeholder="i.e https://example.com/logo.png"
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.companyLogoUrl?.join(", ")}
						</div>
					)}
					<InputPair
						label="Company Location"
						description="(40 characters max)"
						name="companyLocation"
						id="companyLocation"
						type="text"
						required
						placeholder="i.e Remote"
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.companyLocation?.join(", ")}
						</div>
					)}
					<InputPair
						label="Apply URL"
						description="(40 characters max)"
						name="applyUrl"
						id="applyUrl"
						type="url"
						required
						placeholder="i.e https://example.com/apply"
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.applyUrl?.join(", ")}
						</div>
					)}
					<SelectPair
						label="Job Type"
						description="Select the type of job"
						name="jobType"
						required
						placeholder="i.e Full-time"
						options={JOB_TYPES.map((type) => ({
							label: type.label,
							value: type.value,
						}))}
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.jobType?.join(", ")}
						</div>
					)}
					<SelectPair
						label="Job Location"
						description="Select the location of the job"
						name="jobLocation"
						required
						placeholder="i.e Remote"
						options={LOCATION_TYPES.map((type) => ({
							label: type.label,
							value: type.value,
						}))}
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.jobLocation?.join(", ")}
						</div>
					)}
					<SelectPair
						label="Salary Range"
						description="Select the salary range of the job"
						name="salaryRange"
						required
						placeholder="i.e $100,000 - $120,000"
						options={SALARY_RANGE.map((range) => ({
							label: range,
							value: range,
						}))}
					/>
					{actionData && "fieldErrors" in actionData && (
						<div className="text-red-500">
							{actionData.fieldErrors.salaryRange?.join(", ")}
						</div>
					)}
				</div>
				<Button type="submit" className="w-full max-w-sm" size="lg">
					Post job for $00
				</Button>
			</Form>
		</div>
	);
}
