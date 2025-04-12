import { Link } from "react-router";
import {
	Card,
	CardHeader,
	CardTitle,
	CardFooter,
} from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../../common/components/ui/avatar";
import { Button } from "../../../common/components/ui/button";

interface TeamCardProps {
	id: number;
	leaderUserName: string;
	leaderAvatarUrl: string | null;
	roles: string;
	productDescription: string;
}

export function TeamCard({
	id,
	leaderUserName,
	leaderAvatarUrl,
	roles,
	productDescription,
}: TeamCardProps) {
	return (
		<Link to={`/teams/${id}`} className="block">
			<Card className="bg-transparent hover:bg-card/50 transition-colors h-full flex flex-col justify-between">
				<CardHeader className="flex flex-row items-center">
					<CardTitle className="text-base leading-loose">
						<Badge
							variant="secondary"
							className="inline-flex shadow-sm items-center text-base"
						>
							<span>@{leaderUserName}</span>
							<Avatar className="size-5">
								<AvatarFallback className="uppercase bg-primary text-primary-foreground">
									{leaderUserName.slice(0, 1)}
								</AvatarFallback>
								{leaderAvatarUrl ? <AvatarImage src={leaderAvatarUrl} /> : null}
							</Avatar>
						</Badge>
						<span>is looking for </span>
						{roles.split(",").map((role, index) => (
							<Badge key={index} className="text-base mx-0.5">
								{role}
							</Badge>
						))}
						<span> to build </span>
						<span>{productDescription}</span>
					</CardTitle>
				</CardHeader>
				<CardFooter className="justify-end">
					<Button variant="link">Join team &rarr;</Button>
				</CardFooter>
			</Card>
		</Link>
	);
}
