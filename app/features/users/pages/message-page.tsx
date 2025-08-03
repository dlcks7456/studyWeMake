import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/common/components/ui/card";
import type { Route } from "./+types/message-page";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import {
	Form,
	useOutletContext,
	type ShouldRevalidateFunctionArgs,
} from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import { MessageBubble } from "../components/messages-bubble";
import { browserClient, makeSSRClient, type Database } from "~/supa-client";
import {
	getLoggedInUserID,
	getMessagesByRoomId,
	getRoomsParticipant,
	sendMessageToRoom,
} from "../queries";
import { useEffect, useRef, useState } from "react";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Message Details | WeMake" },
		{ name: "description", content: "View message details" },
	];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { client } = await makeSSRClient(request);
	const userId = await getLoggedInUserID(client);
	const messages = await getMessagesByRoomId(client, {
		messageRoomId: params.messageRoomId,
		userId,
	});

	const participant = await getRoomsParticipant(client, {
		messageRoomId: params.messageRoomId,
		userId,
	});

	return { messages, userId, participant };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
	const { client } = await makeSSRClient(request);
	const userId = await getLoggedInUserID(client);
	const formData = await request.formData();
	const message = formData.get("message");

	await sendMessageToRoom(client, {
		messageRoomId: params.messageRoomId,
		userId,
		message: message as string,
	});

	return {
		ok: true,
	};
};

export default function MessagePage({
	loaderData,
	actionData,
}: Route.ComponentProps) {
	const [messages, setMessages] = useState(loaderData.messages);
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	const { userId, name, avatar } = useOutletContext<{
		userId: string;
		name: string;
		avatar: string;
	}>();
	const formRef = useRef<HTMLFormElement>(null);

	// 메시지 전송 후 폼 리셋
	useEffect(() => {
		if (actionData?.ok) formRef.current?.reset();
	}, [actionData]);

	// 새 메시지 구독
	useEffect(() => {
		const changes = browserClient
			.channel(`room:${userId}-${loaderData.participant?.profile?.profile_id}`)
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "messages",
				},
				(payload) => {
					setMessages((prev) => [
						...prev,
						payload.new as Database["public"]["Tables"]["messages"]["Row"],
					]);
				},
			)
			.subscribe();

		return () => {
			changes.unsubscribe();
		};
	}, []);

	useEffect(() => {
		const container = messagesContainerRef.current;
		container?.scrollTo({
			top: container.scrollHeight,
			behavior: "smooth",
		});
	}, [messages]);

	return (
		<div className="h-full flex flex-col justify-between">
			<Card>
				<CardHeader className="flex flex-row gap-4 ">
					<Avatar className="size-14">
						<AvatarFallback>
							{loaderData.participant.profile.name?.[0] ?? "N"}
						</AvatarFallback>
						<AvatarImage
							src={loaderData.participant.profile.avatar ?? undefined}
						/>
					</Avatar>
					<div className="flex flex-col gap-00">
						<CardTitle>{loaderData.participant.profile.name}</CardTitle>
						<CardDescription>2 days ago</CardDescription>
					</div>
				</CardHeader>
			</Card>
			<div
				ref={messagesContainerRef}
				className="py-10 overflow-y-scroll space-y-4 flex flex-col justify-start h-full"
			>
				{messages.map((message) => (
					<MessageBubble
						key={message.message_id}
						content={message.content}
						avatarSrc={
							message.sender_id === userId
								? avatar
								: loaderData.participant.profile.avatar ?? ""
						}
						avatarFallback={
							message.sender_id === userId
								? name?.[0]
								: loaderData.participant.profile.name?.[0] ?? "N"
						}
						isCurrentUser={message.sender_id === userId}
					/>
				))}
			</div>
			<Card>
				<CardHeader>
					<Form
						className="relative flex justify-end items-center"
						method="post"
						ref={formRef}
					>
						<Textarea
							placeholder="Write a message..."
							rows={2}
							className="resize-none"
							required
							name="message"
						/>
						<Button type="submit" size="icon" className="absolute right-2">
							<SendIcon className="size-4" />
						</Button>
					</Form>
				</CardHeader>
			</Card>
		</div>
	);
}

export const shouldRevalidate = () => false;
