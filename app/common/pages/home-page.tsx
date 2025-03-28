import { Link, type MetaFunction } from "react-router";
import { ProductCard } from "../../features/products/components/product-card";
import { Button } from "../components/ui/button";
import { PostCard } from "../../features/community/components/post-card";
import { IdeaCard } from "../../features/ideas/components/idea-card";
import { JobCard } from "../../features/jobs/components/job-card";
import { TeamCard } from "../../features/teams/components/team-card";
import { getProductsByDateRange } from "../../features/products/queries";
import { DateTime } from "luxon";
import type { Route } from "./+types/home-page";

export const meta: MetaFunction = () => {
	return [
		{
			title: "Home | wemake",
		},
		{ name: "description", content: "Welcome to wemake" },
	];
};

export const loader = async () => {
	const products = await getProductsByDateRange({
		startDate: DateTime.now().startOf("day"),
		endDate: DateTime.now().endOf("day"),
		limit: 7,
	});

	return { products };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="px-20 space-y-40">
			<div className="grid grid-cols-3 gap-4">
				<div>
					<h2 className="text-5xl font-bold leading-tight tracking-tight">
						Today's Products
					</h2>
					<p className="text-xl font-light text-foreground">
						The best products made by our community today.
					</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/products/leaderboards">Explore all products &rarr;</Link>
					</Button>
				</div>

				{loaderData.products.map((product) => (
					<ProductCard
						key={product.product_id}
						id={product.product_id.toString()}
						name={product.name}
						description={product.description}
						reviewsCount={product.reviews}
						viewCount={product.views}
						votesCount={product.upvotes}
					/>
				))}
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<h2 className="text-5xl font-bold leading-tight tracking-tight">
						Latest discussions
					</h2>
					<p className="text-xl font-light text-foreground">
						The latest discussions from our community.
					</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/products/leaderboards">
							Explore all discussions &rarr;
						</Link>
					</Button>
				</div>
				{Array.from({ length: 11 }).map((_, index) => (
					<PostCard
						key={index}
						id={index}
						title="What is the best productivity tool?"
						author="Nico"
						avatarUrl="https://github.com/apple.png"
						category="Productivity"
						postedAt="12 hours ago"
					/>
				))}
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<h2 className="text-5xl font-bold leading-tight tracking-tight">
						IdeasGPT
					</h2>
					<p className="text-xl font-light text-foreground">
						Find ideas for your next project.
					</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/ideas">Explore all ideas &rarr;</Link>
					</Button>
				</div>
				{Array.from({ length: 11 }).map((_, index) => (
					<IdeaCard
						key={index}
						id="ideaId"
						title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
						viewCount={123}
						postedAt="12 hours ago"
						likesCount={12}
						claimed={index % 2 === 0}
					/>
				))}
			</div>
			<div className="grid grid-cols-4 gap-4">
				<div>
					<h2 className="text-5xl font-bold leading-tight tracking-tight">
						Latest Jobs
					</h2>
					<p className="text-xl font-light text-foreground">
						Find your dream job
					</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/jobs">Explore all jobs &rarr;</Link>
					</Button>
				</div>
				{Array.from({ length: 11 }).map((_, index) => (
					<JobCard
						key={index}
						id="jobId"
						company="Meta"
						companyLogoUrl="https://github.com/facebook.png"
						companyHq="San Francisco, CA"
						title="Software Engineer"
						postedAt="12 hours ago"
						type="Full-time"
						positionLocation="Remote"
						salary="$100,000 - $120,000"
					/>
				))}
			</div>
			<div className="grid grid-cols-4 gap-4">
				<div>
					<h2 className="text-5xl font-bold leading-tight tracking-tight">
						Find a team mate.
					</h2>
					<p className="text-xl font-light text-foreground">
						Join a team looking for a new member
					</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/teams">Explore all teams &rarr;</Link>
					</Button>
				</div>
				{Array.from({ length: 11 }).map((_, index) => (
					<TeamCard
						key={index}
						id="teamId"
						leaderUserName="lynn"
						leaderAvatarUrl="https://github.com/inthetiger.png"
						positions={[
							"React Developer",
							"Backend Developer",
							"Product Manager",
						]}
						projectDescription="a new social media platform"
					/>
				))}
			</div>
		</div>
	);
}
