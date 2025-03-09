import { Form, Link, NavLink, Outlet } from "react-router";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button, buttonVariants } from "~/common/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import { cn } from "~/lib/utils";

export default function ProfileLayout() {
	return (
		<div className="space-y-10">
			<div className="flex items-center gap-4">
				<Avatar className="size-40">
					<AvatarFallback>N</AvatarFallback>
					<AvatarImage src="https://github.com/shadcn.png" />
				</Avatar>
				<div className="space-y-5">
					<div className="flex gap-2">
						<h1 className="text-2xl font-semibold">John Doe</h1>
						<Button variant="outline" asChild>
							<Link to="/my/settings">Edit profile</Link>
						</Button>
						<Button variant="secondary">Follow</Button>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="secondary">Messages</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Messages</DialogTitle>
								</DialogHeader>
								<DialogDescription className="space-y-4">
									<span className="text-sm text-muted-foreground">
										Send a message to John Doe
									</span>
									<Form className="space-y-4">
										<Textarea
											placeholder="Message"
											className="resize-none"
											rows={4}
										/>
										<Button type="submit">Submit</Button>
									</Form>
								</DialogDescription>
							</DialogContent>
						</Dialog>
					</div>
					<div className="flex gap-2">
						<span className="text-sm text-muted-foreground">@john_doe</span>
						<Badge variant={"secondary"}>Product Designer</Badge>
						<Badge variant={"secondary"}>100 followers</Badge>
						<Badge variant={"secondary"}>100 following</Badge>
					</div>
				</div>
			</div>
			<div className="flex gap-5">
				{[
					{
						label: "About",
						to: "/users/username",
					},
					{
						label: "Products",
						to: "/users/username/products",
					},
					{
						label: "Posts",
						to: "/users/username/posts",
					},
				].map((item) => (
					<NavLink
						end
						className={({ isActive }) =>
							cn([
								buttonVariants({ variant: "outline" }),
								isActive && "bg-accent text-foreground font-bold",
							])
						}
						to={item.to}
					>
						{item.label}
					</NavLink>
				))}
			</div>
			<div className="max-w-screen-md">
				<Outlet />
			</div>
		</div>
	);
}
