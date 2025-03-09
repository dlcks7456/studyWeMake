import { Link } from "react-router";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Separator } from "./ui/separator";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuGroup,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
	BarChart3Icon,
	UserIcon,
	SettingsIcon,
	LogOutIcon,
	BellIcon,
	MessageCircleIcon,
} from "lucide-react";

const menus = [
	{
		name: "Products",
		to: "/products",
		items: [
			{
				name: "Leaderboard",
				description: "See the top performers in your community",
				to: "/products/leaderboards",
			},
			{
				name: "Categories",
				description: "See the top performers in your community",
				to: "/products/categories",
			},
			{
				name: "Search",
				description: "Search for a product",
				to: "/products/search",
			},
			{
				name: "Submit a Product",
				description: "Submit a product to be featured on our community",
				to: "/products/submit",
			},
			{
				name: "Promote",
				description: "Promote your product to the top of the community",
				to: "/products/promote",
			},
		],
	},
	{
		name: "Jobs",
		to: "/jobs",
		items: [
			{
				name: "Remote Jobs",
				description: "Find a remote job in our community",
				to: "/jobs?location=remote",
			},
			{
				name: "Full-Time Jobs",
				description: "Find a full-time job in our community",
				to: "/jobs?type=full-time",
			},
			{
				name: "Freelance Jobs",
				description: "Find a freelance job in our community",
				to: "/jobs?type=freelance",
			},
			{
				name: "Internships",
				description: "Find an internship in our community",
				to: "/jobs?type=internship",
			},
			{
				name: "Submit a Job",
				description: "Submit a job to be featured on our community",
				to: "/jobs/submit",
			},
		],
	},
	{
		name: "Community",
		to: "/community",
		items: [
			{
				name: "All Posts",
				description: "See all posts in our community",
				to: "/community",
			},
			{
				name: "Top Posts",
				description: "See the top posts in our community",
				to: "/community?sort=top",
			},
			{
				name: "New Posts",
				description: "See the latest posts in our community",
				to: "/community?sort=new",
			},
			{
				name: "Create a Post",
				description: "Create a post to be featured on our community",
				to: "/community/create",
			},
		],
	},
	{
		name: "IdeasGPT",
		to: "/ideas",
	},
	{
		name: "Teams",
		to: "/teams",
		items: [
			{
				name: "All Teams",
				description: "See all teams in our community",
				to: "/teams",
			},
			{
				name: "Create a Team",
				description: "Create a team to be featured on our community",
				to: "/teams/create",
			},
		],
	},
];

export default function Navigation({
	isLoggedIn,
	hasNotifications,
	hasMessages,
}: {
	isLoggedIn: boolean;
	hasNotifications: boolean;
	hasMessages: boolean;
}) {
	return (
		<nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
			<div className="flex items-center">
				<Link to="/" className="font-bold tracking-tighter text-lg">
					weMake
				</Link>
				<Separator orientation="vertical" className="h-6 mx-4" />
				<NavigationMenu>
					<NavigationMenuList>
						{menus.map((menu) => (
							<NavigationMenuItem key={menu.name}>
								{menu.items ? (
									<>
										<Link to={menu.to}>
											<NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
										</Link>
										<NavigationMenuContent>
											<ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
												{menu.items?.map((item) => (
													<NavigationMenuItem
														key={item.name}
														className={cn([
															"select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
															(item.to === "/products/promote" ||
																item.to === "/jobs/promote") &&
																"col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
														])}
													>
														<NavigationMenuLink asChild>
															<Link
																className="p-3 space-y-1 block leading-none no-underline outline-none"
																to={item.to}
															>
																<span className="text-sm font-medium leading-none">
																	{item.name}
																</span>
																<p className="text-sm leading-snug text-muted-foreground">
																	{item.description}
																</p>
															</Link>
														</NavigationMenuLink>
													</NavigationMenuItem>
												))}
											</ul>
										</NavigationMenuContent>
									</>
								) : (
									<Link className={navigationMenuTriggerStyle()} to={menu.to}>
										{menu.name}
									</Link>
								)}
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			{isLoggedIn ? (
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="icon" asChild className="relative">
						<Link to="/my/notifications">
							<BellIcon className="size-4" />
							{hasNotifications && (
								<span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
							)}
						</Link>
					</Button>
					<Button variant="ghost" size="icon" asChild className="relative">
						<Link to="/my/messages">
							<MessageCircleIcon className="size-4" />
							{hasMessages && (
								<span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
							)}
						</Link>
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar>
								<AvatarImage src="https://github.com/dlcks7456.png" />
								<AvatarFallback>N</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel className="flex flex-col">
								<span className="font-medium">John Doe</span>
								<span className="text-xs text-muted-foreground">@username</span>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem asChild className="cursor-pointer">
									<Link to="/my/dashboard">
										<BarChart3Icon className="size-4 mr-2" />
										Dashboard
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild className="cursor-pointer">
									<Link to="/my/profile">
										<UserIcon className="size-4 mr-2" />
										Profile
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild className="cursor-pointer">
									<Link to="/my/settings">
										<SettingsIcon className="size-4 mr-2" />
										Settings
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild className="cursor-pointer">
									<Link to="/auth/logout">
										<LogOutIcon className="size-4 mr-2" />
										Logout
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			) : (
				<div className="flex items-center gap-4">
					<Button asChild variant="secondary">
						<Link to="/auth/login">Login</Link>
					</Button>
					<Button asChild>
						<Link to="/auth/join">Join</Link>
					</Button>
				</div>
			)}
		</nav>
	);
}
