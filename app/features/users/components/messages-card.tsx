import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link, useLocation } from "react-router";
import { Avatar } from "~/common/components/ui/avatar";
import {
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/common/components/ui/sidebar";

interface MessagesCardProps {
	avatarSrc?: string;
	id: string;
	name: string;
	lastMessage: string;
}

export function MessagesCard({
	avatarSrc,
	id,
	name,
	lastMessage,
}: MessagesCardProps) {
	const location = useLocation();
	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				className="h-18"
				asChild
				isActive={location.pathname === `/my/messages/${id}`}
			>
				<Link to={`/my/messages/${id}`}>
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarFallback className="uppercase">{name[0]}</AvatarFallback>
							{avatarSrc && <AvatarImage src={avatarSrc} />}
						</Avatar>
						<div className="flex flex-col">
							<p className="text-sm font-medium">{name}</p>
							<p className="text-xs text-muted-foreground">{lastMessage}</p>
						</div>
					</div>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
