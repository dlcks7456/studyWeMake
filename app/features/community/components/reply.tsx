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
interface ReplyProps {
	avatarUrl: string;
	username: string;
	timestamp: string;
	content: string;
	topLevel?: boolean;
}

export function Reply({
	avatarUrl,
	username,
	timestamp,
	content,
	topLevel = false,
}: ReplyProps) {
	const [replying, setReplying] = useState(false);
	const toggleReplying = () => setReplying((prev) => !prev);
	return (
		<div className="flex flex-col gap-5">
			<div className="flex gap-5 items-start">
				<Avatar className="size-14">
					<AvatarFallback>N</AvatarFallback>
					<AvatarImage src={avatarUrl} />
				</Avatar>
				<div className="flex flex-col gap-4 items-start w-full">
					<div className="flex gap-2 items-center">
						<Link to={`/users/@${username}`}>
							<h4 className="font-medium">{username}</h4>
						</Link>
						<DotIcon className="size-5" />
						<span className="text-xs text-muted-foreground">{timestamp}</span>
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
			{topLevel && (
				<div className="pl-20 w-full">
					<Reply
						avatarUrl="https://github.com/apple.png"
						username="Chan"
						timestamp="12 hours ago"
						content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
						topLevel={false}
					/>
				</div>
			)}
		</div>
	);
}
