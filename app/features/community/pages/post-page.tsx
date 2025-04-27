import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import type { Route } from "./+types/post-page";
import { Form, Link } from "react-router";
import {
	ChevronUpIcon,
	DotIcon,
	MessageCircleIcon,
	UserIcon,
} from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Reply } from "~/features/community/components/reply";
import { z } from "zod";
import { getPostById } from "../queries";
import { DateTime } from "luxon";

const postIdSchema = z.object({
	postId: z.coerce.number(),
});

export function meta({}: Route.MetaArgs) {
	return [{ title: "Post | wemake" }];
}

export const loader = async ({ params }: Route.LoaderArgs) => {
	const { success, data } = postIdSchema.safeParse(params);

	if (!success) {
		throw new Response("Not Found", { status: 404 });
	}

	const post = await getPostById({ postId: data.postId });

	return { post };
};

export default function PostPage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="space-y-10">
			<div>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to="/community">Community</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to={`/community?topic=${loaderData.post.topic_slug}`}>
									{loaderData.post.topic_name}
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to={`/community/post/${loaderData.post.post_id}`}>
									{loaderData.post.title}
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="grid grid-cols-6 gap-40 items-start">
				<div className="col-span-4 space-y-10">
					<div className="flex w-full items-start gap-10">
						<Button variant="outline" className="flex flex-col h-14">
							<ChevronUpIcon className="size-4 shrink-0" />
							<span>10</span>
						</Button>
						<div className="space-y-20 w-full">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold">{loaderData.post.title}</h2>
								<div className="flex items-center gap-2 text-sm text-foreground">
									<span>@{loaderData.post.author_name}</span>
									<DotIcon className="size-5" />
									<span>
										{DateTime.fromISO(loaderData.post.created_at).toRelative()}
									</span>
									<DotIcon className="size-5" />
									<span>{loaderData.post.replies} replies</span>
								</div>
								<p className="text-muted-foreground w-2/3">
									{loaderData.post.content}
								</p>
							</div>
							<Form className="flex items-start gap-5 w-3/4">
								<Avatar className="size-14">
									<AvatarFallback>N</AvatarFallback>
									<AvatarImage src="https://github.com/microsoft.png" />
								</Avatar>
								<div className="flex flex-col gap-5 items-end w-full">
									<Textarea
										placeholder="Write a reply"
										className="w-full resize-none"
										rows={5}
									/>
									<Button>Reply</Button>
								</div>
							</Form>
							<div className="space-y-10">
								<h4 className="font-semibold">Replies</h4>

								<Reply
									avatarUrl="https://github.com/apple.png"
									username="Chan"
									timestamp="12 hours ago"
									content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
									topLevel={true}
								/>
							</div>
						</div>
					</div>
				</div>
				<aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-5">
					<div className="flex gap-5">
						<Avatar className="size-14">
							<AvatarFallback>{loaderData.post.author_name[0]}</AvatarFallback>
							{loaderData.post.author_avatar !== null ? (
								<AvatarImage src={loaderData.post.author_avatar} />
							) : null}
						</Avatar>
						<div className="flex flex-col items-start">
							<h4 className="text-lg font-medium">
								{loaderData.post.author_name}
							</h4>
							<Badge
								variant="secondary"
								className="capitalize flex justify-center"
							>
								{loaderData.post.author_role}
							</Badge>
						</div>
					</div>
					<div className="text-sm flex flex-col gap-2">
						<span>
							🍰 Joined{" "}
							{DateTime.fromISO(loaderData.post.author_created_at).toRelative()}{" "}
							ago
						</span>
						<span>🚀 Launched {loaderData.post.product_count} products</span>
					</div>
					<Button variant="outline" className="w-full">
						Follow
					</Button>
				</aside>
			</div>
		</div>
	);
}
