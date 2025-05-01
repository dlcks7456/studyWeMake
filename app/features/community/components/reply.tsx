import { Form, Link } from "react-router";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";
interface ReplyProps {
	avatarUrl: string | null;
	username: string | null;
	timestamp: string;
	content: string;
	topLevel?: boolean;
	replies?: any;
	// replies?: {
	// 	post_reply_id: number;
	// 	reply: string;
	// 	created_at: string;
	// 	user: {
	// 		name: string;
	// 		avatar: string | null;
	// 		username: string;
	// 	};
	// }[];
}

export function Reply({
	avatarUrl,
	username,
	timestamp,
	content,
	topLevel = false,
	replies,
}: ReplyProps) {
	const [replying, setReplying] = useState(false);
	const toggleReplying = () => setReplying((prev) => !prev);
	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex items-start gap-5 w-2/3">
				<Avatar className="size-14">
					<AvatarFallback>N</AvatarFallback>
					{avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
				</Avatar>
				<div className="flex flex-col items-start w-full">
					<div className="flex gap-2 items-center">
						<Link to={`/users/@${username}`}>
							<h4 className="font-medium">{username}</h4>
						</Link>
						<DotIcon className="size-5" />
						<span className="text-xs text-muted-foreground">
							{DateTime.fromISO(timestamp).toRelative()}
						</span>
					</div>
					<p className="text-muted-foreground">{content}</p>
					<Button variant="ghost" className="self-end" onClick={toggleReplying}>
						<MessageCircleIcon className="size-4" />
						Reply
					</Button>
				</div>
			</div>
			{replying && (
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
			)}
			{topLevel && replies && (
				<div className="pl-20 w-full">
					{replies.map((reply: any) => (
						<Reply
							avatarUrl={reply.user?.avatar}
							username={reply.user?.username}
							timestamp={reply.created_at}
							content={reply.reply}
							topLevel={false}
						/>
					))}
				</div>
			)}
		</div>
	);
}
