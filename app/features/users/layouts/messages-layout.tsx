import { Outlet, useOutletContext } from "react-router";
import { MessagesCard } from "../components/messages-card";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarMenu,
	SidebarProvider,
} from "~/common/components/ui/sidebar";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/messages-layout";
import { getLoggedInUserID, getMessages } from "../queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { client } = await makeSSRClient(request);
	const userId = await getLoggedInUserID(client);
	const messages = await getMessages(client, { userId });

	return { messages };
};

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
	const { userId, name, avatar } = useOutletContext<{
		userId: string;
		name: string;
		avatar: string;
	}>();
	return (
		<SidebarProvider className="flex max-h-[calc(100vh-14rem)] overflow-hidden h-[calc(100vh-14rem)] min-h-full">
			<Sidebar className="pt-16" variant="floating">
				<SidebarContent>
					<SidebarGroup>
						<SidebarMenu>
							{loaderData.messages.map((message) => (
								<MessagesCard
									key={message.message_room_id}
									id={message.message_room_id.toString()}
									name={message.name}
									lastMessage={message.last_message}
									avatarSrc={message.avatar}
								/>
							))}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<div className="w-full">
				<Outlet context={{ userId, name, avatar }} />
			</div>
		</SidebarProvider>
	);
}
