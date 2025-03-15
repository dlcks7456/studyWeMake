import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/community-page";
import { Form, Link, useSearchParams } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { PERIOD_OPTIONS, SORT_OPTIONS } from "../constants";
import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import { Input } from "~/common/components/ui/input";
import { PostCard } from "../components/post-card";
import { getPosts, getTopics } from "../queries";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Community | wemake" }];
}

export const loader = async () => {
	const topics = await getTopics();
	const posts = await getPosts();

	return { topics, posts };
};

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sorting = searchParams.get("sorting") || "newest";
	const period = searchParams.get("period") || "all";

	return (
		<div>
			<Hero
				title="Community"
				subtitle="Ask questions, share ideas, and get help from the community."
			/>
			<div className="grid grid-cols-6 items-start gap-40">
				<div className="col-span-4 space-y-10">
					<div className="flex justify-between">
						<div className="space-y-5 w-full">
							<div className="flex items-center gap-5">
								<DropdownMenu>
									<DropdownMenuTrigger className="flex items-center gap-1">
										<span className="text-sm capitalize">{sorting}</span>
										<ChevronDownIcon className="size-5" />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										{SORT_OPTIONS.map((option) => (
											<DropdownMenuCheckboxItem
												key={option}
												className="capitalize cursor-pointer text-center"
												onCheckedChange={(checked: boolean) => {
													if (checked) {
														searchParams.set("sorting", option);
														if (option === "newest") {
															searchParams.delete("period");
														}
														setSearchParams(searchParams);
													}
												}}
											>
												{option}
											</DropdownMenuCheckboxItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
								{sorting === "popular" && (
									<DropdownMenu>
										<DropdownMenuTrigger className="flex items-center gap-1">
											<span className="text-sm capitalize">{period}</span>
											<ChevronDownIcon className="size-5" />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											{PERIOD_OPTIONS.map((option) => (
												<DropdownMenuCheckboxItem
													key={option}
													className="capitalize cursor-pointer text-center"
													onCheckedChange={(checked: boolean) => {
														if (checked) {
															searchParams.set("period", option);
															setSearchParams(searchParams);
														}
													}}
												>
													{option}
												</DropdownMenuCheckboxItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								)}
							</div>
							<Form className="w-2/3">
								<Input type="search" placeholder="Search for discussions" />
							</Form>
						</div>
						<Button asChild>
							<Link to="/community/submit">Create Discussion</Link>
						</Button>
					</div>
					<div className="space-y-5">
						{loaderData.posts.map((post) => (
							<PostCard
								key={post.post_id}
								id={post.post_id}
								title={post.title}
								author={post.author}
								avatarUrl={post.author_avatar}
								category={post.topic}
								postedAt={post.created_at}
								votesCount={post.upvotes}
								expanded={true}
							/>
						))}
					</div>
				</div>
				<aside className="col-span-2 space-y-5">
					<span className="text-sm font-medium text-muted-foreground uppercase">
						Topics
					</span>
					<div className="flex flex-col gap-2 items-start">
						{loaderData.topics.map((topic) => (
							<Button asChild variant={"link"} className="pl-0">
								<Link
									key={topic.slug}
									to={`/community?topic=${topic.slug}`}
									className="font-semibold"
								>
									{topic.name}
								</Link>
							</Button>
						))}
					</div>
				</aside>
			</div>
		</div>
	);
}
