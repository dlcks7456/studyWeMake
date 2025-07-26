import {
	Card,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/common/components/ui/card";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Link } from "react-router";
import { useFetcher } from "react-router";

interface NotificationCardProps {
	avatarSrc: string;
	avatarFallback: string;
	userName: string;
	type: "follow" | "review" | "reply" | "mention";
	timestamp: string;
	seen: boolean;
	notificationId: string | number;
	productName?: string;
	postTitle?: string;
	payloadId?: string | number;
}

export function NotificationCard({
	avatarSrc,
	avatarFallback,
	userName,
	type,
	timestamp,
	seen,
	productName,
	postTitle,
	payloadId,
	notificationId,
}: NotificationCardProps) {
	const fetcher = useFetcher();

	const getMessage = (type: "follow" | "review" | "reply" | "mention") => {
		switch (type) {
			case "follow":
				return "followed you";
			case "review":
				return "reviewed your product:";
			case "reply":
				return "replied to your post:";
			case "mention":
				return "mentioned you in a post:";
		}
	};

	const optimisticSeen = fetcher.state === "idle" ? seen : true;

	return (
		<Card
			className={cn("min-w-[450px]", optimisticSeen ? "" : "bg-yellow-500/60")}
		>
			<CardHeader className="flex flex-row gap-5 items-start">
				<Avatar>
					<AvatarFallback>{avatarFallback}</AvatarFallback>
					<AvatarImage src={avatarSrc} />
				</Avatar>
				<div>
					<CardTitle className="text-lg font-bold">
						<span>{userName}</span>
						<span> {getMessage(type)}</span>
						{productName && (
							<Button variant={"ghost"} className="text-lg font-bold" asChild>
								<Link to={`/products/${payloadId}`}>{productName}</Link>
							</Button>
						)}
						{postTitle && (
							<Button variant={"ghost"} className="text-lg font-bold" asChild>
								<Link to={`/community/${payloadId}`}>{postTitle}</Link>
							</Button>
						)}
					</CardTitle>
					<small className="text-muted-foreground text-sm">{timestamp}</small>
				</div>
			</CardHeader>
			{!optimisticSeen ? (
				<CardFooter className="flex justify-end">
					<fetcher.Form
						method="post"
						action={`/my/notifications/${notificationId}/see`}
					>
						<Button variant="outline" size="icon">
							<EyeIcon className="w-4 h-4" />
						</Button>
					</fetcher.Form>
				</CardFooter>
			) : null}
		</Card>
	);
}
