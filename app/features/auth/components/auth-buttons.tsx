import { Separator } from "@radix-ui/react-separator";
import { MessageCircleIcon, GithubIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";

export default function AuthButtons() {
	return (
		<div className="w-full flex flex-col items-center justify-center gap-2">
			<div className="w-full flex flex-col items-center gap-2">
				<Separator className="w-full" />
				<span className="text-ss text-muted-foreground uppercase font-medium">
					Or continue with
				</span>
				<Separator className="w-full" />
			</div>
			<div className="w-full flex flex-col gap-2">
				<Button variant="outline" className="w-full" asChild>
					<Link to="/auth/social/kakao/start">
						<MessageCircleIcon className="w-4 h-4" />
						KaKao Talk
					</Link>
				</Button>
				<Button variant="outline" className="w-full" asChild>
					<Link to="/auth/social/github/start">
						<GithubIcon className="w-4 h-4" />
						Github
					</Link>
				</Button>
				<Button variant="outline" className="w-full" asChild>
					<Link to="/auth/otp/start">
						<LockIcon className="w-4 h-4" />
						OTP
					</Link>
				</Button>
			</div>
		</div>
	);
}
