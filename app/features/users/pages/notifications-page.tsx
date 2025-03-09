import type { Route } from "./+types/notifications-page";
import { NotificationCard } from "../components/notification-card";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Notifications | WeMake" },
		{ name: "description", content: "View your notifications" },
	];
};

export default function NotificationsPage() {
	return (
		<div className="space-y-20">
			<h1 className="text-4xl font-bold">Notification</h1>
			<div className="flex flex-col items-start gap-5">
				<NotificationCard
					avatarSrc="https://github.com/stevejobs.png"
					avatarFallback="N"
					userName="Steve Jobs"
					message=" followed you."
					timestamp="2 days ago"
					seen={false}
				/>
			</div>
		</div>
	);
}
