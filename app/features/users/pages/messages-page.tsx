import { MessageCircleIcon } from "lucide-react";
import type { Route } from "./+types/messages-page";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Messages | WeMake" },
		{ name: "description", content: "View your messages" },
	];
};

export default function MessagesPage() {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-4">
			<MessageCircleIcon className="size-12 text-muted-foreground" />
			<h1 className="text-xl text-muted-foreground font-semibold">
				Click on a message to start chatting
			</h1>
		</div>
	);
}
