import { Outlet } from "react-router";
import { MessagesCard } from "../components/messages-card";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarMenu,
	SidebarProvider,
} from "~/common/components/ui/sidebar";

export default function MessagesLayout() {
	return (
		<SidebarProvider className="max-h-[calc(100vh-14rem)] overflow-hidden h-full min-h-full">
			<Sidebar className="pt-16" variant="floating">
				<SidebarContent>
					<SidebarGroup>
						<SidebarMenu>
							{Array.from({ length: 10 }).map((_, index) => (
								<MessagesCard
									key={index}
									id={index.toString()}
									name={`User ${index}`}
									lastMessage={`Last message ${index}`}
									avatarSrc="https://github.com/apple.png"
								/>
							))}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<div className="w-full">
				<Outlet />
			</div>
		</SidebarProvider>
	);
}
