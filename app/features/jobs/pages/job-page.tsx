import { Badge } from "~/common/components/ui/badge";
import type { Route } from "./+types/job-page";
import { DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Senior Frontend Developer at Company Name | webake" },
		{
			name: "description",
			content: "Apply for Senior Frontend Developer position at Company Name",
		},
	];
};

export default function JobPage() {
	return (
		<div>
			<div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
			<div className="grid grid-cols-6 gap-20 items-start -mt-20">
				<div className="col-span-4 space-y-10">
					<div>
						<div className="size-40 bg-white rounded-full overflow-hidden relative left-10">
							<img
								src="https://github.com/facebook.png"
								className="object-cover"
							/>
						</div>
						<h1 className="text-4xl font-bold">Software Engineer</h1>
						<h4 className="text-lg text-muted-foreground">Meta Inc.</h4>
					</div>
					<div className="flex gap-2">
						<Badge variant={"secondary"}>Full-time</Badge>
						<Badge variant={"secondary"}>Remote</Badge>
					</div>
					<div className="space-y-2.5">
						<h4 className="text-2xl font-bold">Overview</h4>
						<p className="text-lg">
							This is a full-time remote position. We are looking for a senior
							frontend developer who is proficient in React, TypeScript, and
							Next.js.
						</p>
					</div>
					<div className="space-y-2.5">
						<h4 className="text-2xl font-bold">Responsibilities</h4>
						<ul className="text-lg list-disc list-inside">
							{[
								"Design, build, and ship features and components",
								"Build reusable code and libraries for future use",
								"Optimize components for performance with debouncing and throttling",
								"Collaborate with other team members and stakeholders to discuss design ideas and applications",
								"Stay up to date with emerging technologies and industry trends",
								"Work in a fast-paced environment with a high-volume of traffic",
							].map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>
					<div className="space-y-2.5">
						<h4 className="text-2xl font-bold">Qualifications</h4>
						<ul className="text-lg list-disc list-inside">
							{[
								"Bachelor's degree in Computer Science or related field",
								"5+ years of experience in frontend development",
								"Proficient in React, TypeScript, and Next.js",
								"Strong understanding of web development best practices",
								"Excellent problem-solving skills",
								"Excellent communication skills",
							].map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>
					<div className="space-y-2.5">
						<h4 className="text-2xl font-bold">Benefits</h4>
						<ul className="text-lg list-disc list-inside">
							{[
								"Flexible working hours",
								"Remote work",
								"Health insurance",
								"Dental insurance",
								"Vision insurance",
								"401(k) plan",
								"Stock options",
							].map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>
					<div className="space-y-2.5">
						<h4 className="text-2xl font-bold">Skills</h4>
						<ul className="text-lg list-disc list-inside">
							{[
								"React",
								"TypeScript",
								"Next.js",
								"Tailwind CSS",
								"Figma",
								"Git",
								"GitHub",
							].map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>
				</div>
				<div className="space-y-5 col-span-2 sticky top-20 border rounded-lg mt-32 p-6">
					<div className="flex flex-col">
						<span className="text-sm text-muted-foreground">Avg. Salary</span>
						<span className="text-2xl font-medium">$100,000 - $120,000</span>
					</div>
					<div className="flex flex-col">
						<span className="text-sm text-muted-foreground">Location</span>
						<span className="text-2xl font-medium">Remote</span>
					</div>
					<div className="flex flex-col">
						<span className="text-sm text-muted-foreground">Type</span>
						<span className="text-2xl font-medium">Full Time</span>
					</div>
					<div className="flex items-center">
						<span className="text-sm text-muted-foreground">
							Posted 2 days ago
						</span>
						<DotIcon className="size-4" />
						<span className="text-sm text-muted-foreground">395 views</span>
					</div>
					<Button className="w-full">Apply Now</Button>
				</div>
			</div>
		</div>
	);
}
