import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { cn } from "~/lib/utils";

interface MessageBubbleProps {
	content: string;
	avatarSrc?: string;
	isCurrentUser?: boolean;
}

export function MessageBubble({
	content,
	avatarSrc,
	isCurrentUser = false,
}: MessageBubbleProps) {
	return (
		<div
			className={cn(
				"flex items-end gap-4",
				isCurrentUser && "flex-row-reverse",
			)}
		>
			<Avatar>
				<AvatarFallback>N</AvatarFallback>
				{avatarSrc && <AvatarImage src={avatarSrc} />}
			</Avatar>
			<div
				className={cn({
					"rounded-md p-4 text-sm w-1/4": true,
					"bg-accent rounded-br-none": isCurrentUser,
					"bg-primary text-primary-foreground rounded-bl-none": !isCurrentUser,
				})}
			>
				<p>{content}</p>
			</div>
		</div>
	);
}
