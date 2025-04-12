import { Link } from "react-router";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Badge } from "../../../common/components/ui/badge";
import { DateTime } from "luxon";

interface JobCardProps {
	id: number;
	company: string;
	companyLogoUrl: string;
	companyHq: string;
	title: string;
	postedAt: string;
	type: string;
	salary: string;
	positionLocation: string;
}

export function JobCard({
	id,
	company,
	companyLogoUrl,
	companyHq,
	title,
	postedAt,
	type,
	salary,
	positionLocation,
}: JobCardProps) {
	return (
		<Link to={`/jobs/${id}`}>
			<Card className="bg-transparent hover:bg-card/50 transition-colors">
				<CardHeader>
					<div className="flex items-center gap-4 mb-4">
						<img
							src={companyLogoUrl}
							alt={`${company} Logo`}
							className="size-10 rounded-full"
						/>
						<div className="space-x-2">
							<span className="text-accent-foreground">{company}</span>
							<span className="text-xs text-muted-foreground">
								{DateTime.fromISO(postedAt).toRelative()}
							</span>
						</div>
					</div>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<Badge variant="outline" className="capitalize">
						{type}
					</Badge>
					<Badge variant="outline" className="capitalize">
						{positionLocation}
					</Badge>
				</CardContent>
				<CardFooter className="flex justify-between">
					<div className="flex flex-col">
						<span className="text-xs font-medium text-muted-foreground">
							{salary}
						</span>
						<span className="text-xs font-medium text-muted-foreground">
							{companyHq}
						</span>
					</div>
					<Button variant="secondary" size="sm">
						Apply now
					</Button>
				</CardFooter>
			</Card>
		</Link>
	);
}
