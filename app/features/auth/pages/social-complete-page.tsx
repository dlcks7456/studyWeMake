import type { Route } from "./+types/social-complete-page";

export default function SocialCompletePage({}: Route.ComponentProps) {
	return (
		<>
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">
					Authentication Complete
				</h1>
				<p className="text-sm text-muted-foreground">
					Successfully authenticated with provider
				</p>
			</div>
		</>
	);
}
