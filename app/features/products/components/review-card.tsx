import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { StarIcon } from "lucide-react";
import { DateTime } from "luxon";

interface ReviewCardProps {
	username: string;
	handle: string;
	avatarUrl: string | null;
	rating: number;
	content: string;
	postedAt: string;
}

export function ReviewCard({
	avatarUrl,
	handle,
	username,
	rating,
	content,
	postedAt,
}: ReviewCardProps) {
	return (
		<div className="space-y-5">
			<div className="flex items-center gap-2">
				<Avatar>
					<AvatarFallback>N</AvatarFallback>
					{avatarUrl !== null ? <AvatarImage src={avatarUrl} /> : null}
				</Avatar>
				<div>
					<h4 className="text-lg font-bold">{username}</h4>
					<p className="text-sm text-muted-foreground">{handle}</p>
				</div>
			</div>
			<div className="flex text-yellow-400">
				{Array.from({ length: rating }).map((_, i) => (
					<StarIcon key={i} className="size-4" fill="currentColor"></StarIcon>
				))}
			</div>
			<p className="text-sm text-muted-foreground">{content}</p>
			<span className="text-xs text-muted-foreground">
				{DateTime.fromISO(postedAt).toRelative()}
			</span>
		</div>
	);
}
