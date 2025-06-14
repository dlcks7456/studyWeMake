import { Form, Link, useActionData, useOutletContext } from "react-router";
import {
	DotIcon,
	LoaderCircleIcon,
	MessageCircleIcon,
	XIcon,
} from "lucide-react";
import { Button } from "~/common/components/ui/button";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";
import type { action } from "../pages/post-page";
interface ReplyProps {
	name: string | null;
	avatarUrl: string | null;
	username: string | null;
	timestamp: string;
	content: string;
	topLevel?: boolean;
	topLevelId: number;
	replies?: {
		post_reply_id: number;
		reply: string;
	}[];
}

export function Reply({
	name,
	avatarUrl,
	username,
	timestamp,
	content,
	topLevel = false,
	topLevelId,
	replies,
}: ReplyProps) {
	const actionData = useActionData<typeof action>();
	const [replying, setReplying] = useState(false);

	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const toggleReplying = () => setReplying((prev) => !prev);
	const {
		isLoggedIn,
		name: loggedInName,
		avatar,
	} = useOutletContext<{
		isLoggedIn: boolean;
		name: string | null;
		username: string | null;
		avatar: string | null;
	}>();

	useEffect(() => {
		if (actionData?.ok) {
			setReplying(false);
		}

		if (replying) {
			textAreaRef.current?.focus();
			const length = textAreaRef.current?.value.length ?? 0;
			textAreaRef.current?.setSelectionRange(length, length);
		}
	}, [actionData?.ok, replying]);

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex items-start gap-5 w-2/3">
				<Avatar className="size-14">
					{avatarUrl ? (
						<AvatarImage src={avatarUrl} />
					) : (
						<AvatarFallback>{name?.[0] ?? "N"}</AvatarFallback>
					)}
				</Avatar>
				<div className="flex flex-col items-start w-full">
					<div className="flex gap-2 items-center">
						<Link to={`/users/@${username}`}>
							<h4 className="font-medium">{name}</h4>
						</Link>
						<DotIcon className="size-5" />
						<span className="text-xs text-muted-foreground">
							{DateTime.fromISO(timestamp).toRelative()}
						</span>
					</div>
					<p className="text-muted-foreground">{content}</p>
					{isLoggedIn ? (
						<Button
							variant="ghost"
							className="self-end flex items-center gap-2 justify-center"
							onClick={toggleReplying}
						>
							{replying ? (
								<>
									<XIcon className="size-4" />
									<span>Cancel</span>
								</>
							) : (
								<>
									<MessageCircleIcon className="size-4" />
									<span>Reply</span>
								</>
							)}
						</Button>
					) : null}
				</div>
			</div>
			{replying && (
				<Form className="flex items-start gap-5 w-3/4" method="post">
					<input type="hidden" name="topLevelId" value={topLevelId} />
					<Avatar className="size-14">
						{avatar ? (
							<AvatarImage src={avatar} />
						) : (
							<AvatarFallback>{loggedInName?.[0] ?? "N"}</AvatarFallback>
						)}
					</Avatar>
					<div className="flex flex-col gap-5 items-end w-full">
						<Textarea
							ref={textAreaRef}
							name="reply"
							placeholder="Write a reply"
							className="w-full resize-none"
							defaultValue={`@${username} `}
							rows={5}
						/>
						<Button>Reply</Button>
					</div>
				</Form>
			)}
			{topLevel && replies && (
				<div className="pl-20 w-full">
					{replies.map((reply: any) => (
						<Reply
							name={reply.user.name}
							avatarUrl={reply.user.avatar}
							username={reply.user.username}
							timestamp={reply.created_at}
							content={reply.reply}
							topLevel={false}
							topLevelId={topLevelId}
						/>
					))}
				</div>
			)}
		</div>
	);
}
