import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-job-page";
import { Button } from "~/common/components/ui/button";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constant";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Post a Job | webake" },
		{ name: "description", content: "Post a new job listing on webake" },
	];
};

export default function SubmitJobPage() {
	return (
		<div>
			<Hero title="Post a Job" subtitle="Post a new job listing on webake" />
			<Form className="max-w-screen-2xl mx-auto flex flex-col gap-10 items-center">
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
					<InputPair
						label="Company Logo URL"
						description="(40 characters max)"
						name="companyLogoUrl"
						id="companyLogoUrl"
						type="url"
						required
						placeholder="i.e https://example.com/logo.png"
					/>
					<InputPair
						label="Company Location"
						description="(40 characters max)"
						name="companyLocation"
						id="companyLocation"
						type="text"
						required
						placeholder="i.e Remote"
					/>
					<InputPair
						label="Apply URL"
						description="(40 characters max)"
						name="applyUrl"
						id="applyUrl"
						type="url"
						required
						placeholder="i.e https://example.com/apply"
					/>
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
				</div>
				<Button type="submit" className="w-full max-w-sm" size="lg">
					Post job for $00
				</Button>
			</Form>
		</div>
	);
}
