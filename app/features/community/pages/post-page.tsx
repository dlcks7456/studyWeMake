import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import type { Route } from "./+types/post-page";
import {
	Form,
	Link,
	useFetcher,
	useNavigation,
	useOutletContext,
} from "react-router";
import {
	ChevronUpIcon,
	DotIcon,
	LoaderCircleIcon,
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
import { getPostById, getReplies } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserID } from "~/features/users/queries";
import { createReply } from "../mutations";
import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";
const postIdSchema = z.object({
	postId: z.coerce.number(),
});

export function meta({}: Route.MetaArgs) {
	return [{ title: "Post | wemake" }];
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { success, data } = postIdSchema.safeParse(params);
	const { client, headers } = makeSSRClient(request);

	if (!success) {
		throw new Response("Not Found", { status: 404 });
	}

	const post = await getPostById(client, { postId: data.postId });
	const replies = await getReplies(client, { postId: data.postId });
	return { post, replies };
};

const formSchema = z.object({
	reply: z.string().min(1),
	topLevelId: z.coerce.number().optional(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
	const { client } = makeSSRClient(request);
	const userId = await getLoggedInUserID(client);
	const formData = await request.formData();
	const { success, error, data } = formSchema.safeParse(
		Object.fromEntries(formData),
	);
	if (!success) {
		return {
			formErrors: error.flatten().fieldErrors,
		};
	}

	const { reply, topLevelId } = data;
	await createReply(client, {
		postId: params.postId,
		reply,
		userId,
		topLevelId,
	});

	return {
		ok: true,
	};
};

export default function PostPage({
	loaderData,
	actionData,
}: Route.ComponentProps) {
	const fetcher = useFetcher();

	const { isLoggedIn, name, avatar } = useOutletContext<{
		isLoggedIn: boolean;
		name: string | null;
		username: string | null;
		avatar: string | null;
	}>();

	const navigation = useNavigation();
	const isSubmitting =
		navigation.state === "submitting" || navigation.state === "loading";

	const formRef = useRef<HTMLFormElement>(null);
	useEffect(() => {
		if (actionData?.ok) {
			formRef.current?.reset();
		}
	}, [actionData?.ok]);

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
						<fetcher.Form
							method="post"
							action={`/community/${loaderData.post.post_id}/upvote`}
							className="flex flex-col h-14"
						>
							<Button
								variant="outline"
								className={cn(
									"flex flex-col h-14",
									loaderData.post.is_upvoted
										? "border-primary text-primary"
										: "",
								)}
							>
								<ChevronUpIcon className="size-4 shrink-0" />
								<span>{loaderData.post.upvotes}</span>
							</Button>
						</fetcher.Form>
						<div className="space-y-5 w-full">
							<div className="space-y-2 mb-20">
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
							{isLoggedIn ? (
								<Form
									ref={formRef}
									className="flex items-start gap-5 w-3/4"
									method="post"
								>
									<Avatar className="size-14">
										{avatar ? (
											<AvatarImage src={avatar} />
										) : (
											<AvatarFallback>{name?.[0]}</AvatarFallback>
										)}
									</Avatar>
									<div className="flex flex-col gap-5 items-end w-full">
										<Textarea
											placeholder="Write a reply"
											className="w-full resize-none"
											rows={5}
											name="reply"
											// key={isSubmitting ? "submitting" : "idle"}
											// defaultValue={isSubmitting ? "" : undefined}
										/>
										<Button disabled={isSubmitting} className="w-fit">
											{isSubmitting ? (
												<LoaderCircleIcon className="size-4 animate-spin" />
											) : (
												"Reply"
											)}
										</Button>
									</div>
								</Form>
							) : null}
							<div className="space-y-10">
								<h4 className="font-semibold">
									{loaderData.replies.length} Replies
								</h4>
								{loaderData.replies.map((reply) => (
									<Reply
										name={reply.user.name}
										username={reply.user.username}
										avatarUrl={reply.user.avatar}
										timestamp={reply.created_at}
										content={reply.reply}
										topLevel={true}
										topLevelId={reply.post_reply_id}
										replies={reply.post_replies}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
				<aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-5">
					<div className="flex gap-5">
						<Avatar className="size-14">
							{loaderData.post.author_avatar !== null ? (
								<AvatarImage src={loaderData.post.author_avatar} />
							) : (
								<AvatarFallback>
									{loaderData.post.author_name[0] ?? "N"}
								</AvatarFallback>
							)}
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
