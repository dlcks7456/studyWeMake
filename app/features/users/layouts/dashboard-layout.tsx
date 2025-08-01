import { HomeIcon, PackageIcon, RocketIcon, SparklesIcon } from "lucide-react";
import { Link, Outlet, redirect, useLocation } from "react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "~/common/components/ui/sidebar";
import type { Route } from "./+types/dashboard-layout";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserID, getProductsByUserId } from "../queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { client } = await makeSSRClient(request);
	const userId = await getLoggedInUserID(client);
	if (!userId) {
		throw redirect("/login");
	}
	const products = await getProductsByUserId(client, { userId });

	return {
		userId,
		products,
	};
};

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
	const location = useLocation();
	return (
		<SidebarProvider className="flex min-h-full">
			<Sidebar className="pt-16" variant="floating">
				<SidebarContent>
					<SidebarGroup>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={location.pathname === "/my/dashboard"}
									asChild
								>
									<Link to="/my/dashboard">
										<HomeIcon className="size-4" />
										<span>Home</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={location.pathname === "/my/dashboard/ideas"}
									asChild
								>
									<Link to="/my/dashboard/ideas">
										<SparklesIcon className="size-4" />
										<span>Ideas</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup>
					<SidebarGroup>
						<SidebarGroupLabel>Product Analytics</SidebarGroupLabel>
						<SidebarMenu>
							{loaderData.products.map((product) => (
								<SidebarMenuItem key={product.product_id}>
									<SidebarMenuButton
										asChild
										isActive={
											location.pathname ===
											`/my/dashboard/products/${product.product_id}`
										}
									>
										<Link to={`/my/dashboard/products/${product.product_id}`}>
											<RocketIcon className="size-4" />
											<span>{product.name}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<div className="w-full h-full">
				<Outlet />
			</div>
		</SidebarProvider>
	);
}
