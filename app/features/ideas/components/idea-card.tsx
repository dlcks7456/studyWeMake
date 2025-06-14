import { Link } from "react-router";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "../../../common/components/ui/card";
import { CheckIcon, DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { Button } from "../../../common/components/ui/button";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface IdeaCardProps {
	id: number;
	title: string;
	viewCount?: number;
	postedAt?: string;
	likesCount?: number;
	claimed?: boolean;
	owner?: boolean;
}

export function IdeaCard({
	id,
	title,
	viewCount,
	postedAt,
	likesCount,
	claimed,
	owner,
}: IdeaCardProps) {
	return (
		<Card className="bg-transparent hover:bg-card/50 transition-colors flex flex-col justify-between">
			<CardHeader>
				<Link to={claimed || owner ? "" : `/ideas/${id}`}>
					<CardTitle className="text-xl">
						<span
							className={cn(
								claimed
									? "bg-muted-foreground selection:bg-muted-foreground text-muted-foreground break-all"
									: "",
							)}
						>
							{title}
						</span>
					</CardTitle>
				</Link>
			</CardHeader>
			{!owner && (
				<CardContent className="flex items-center text-sm">
					<div className="flex items-center gap-1">
						<EyeIcon className="w-4 h-4" />
						<span>{viewCount} views</span>
					</div>
					<DotIcon className="w-4 h-4" />
					{postedAt && <span>{DateTime.fromISO(postedAt).toRelative()}</span>}
				</CardContent>
			)}

			<CardFooter className="flex justify-end gap-2">
				{!claimed && !owner ? (
					<>
						<Button variant="outline">
							<HeartIcon className="w-4 h-4" />
							<span>{likesCount}</span>
						</Button>
						<Button asChild>
							<Link to={`/ideas/${id}/claim`}>Claim idea now &rarr;</Link>
						</Button>
					</>
				) : (
					<Button variant="outline" disabled className="cursor-not-allowed">
						<LockIcon className="w-4 h-4" />
						<span>Claimed!</span>
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}
