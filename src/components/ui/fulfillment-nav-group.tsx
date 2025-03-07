"use client"
import { LucidePackage, LucidePackageCheck, LucidePackageMinus, LucidePackageOpen, MoreHorizontal } from "lucide-react"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./sidebar"
import Link from "next/link"
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu"

const items = [
	{
		title: "Orders",
		href: "/dashboard/orders",
		icon: <LucidePackage />,
		items: [
			{
				title: "Pending",
				href: "/dashboard/orders/pending",
				icon: LucidePackageOpen
			}, {
				title: "Completed",
				href: "/dashboard/orders/completed",
				icon: LucidePackageCheck
			}, {
				title: "Cancelled",
				href: "/dashboard/orders/cancelled",
				icon: LucidePackageMinus
			}
		]
	}
]

export default function FulfillmentNavGroup() {
	const { isMobile } = useSidebar()
	return (
		<SidebarGroup>
			<SidebarGroupLabel>
				Fulfillment Center
			</SidebarGroupLabel>
			<SidebarMenu>
				{items.map(item => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton asChild>
							<Link href={item.href}>
								{item.icon}
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuAction showOnHover>
									<MoreHorizontal />
									<span className="sr-only">More</span>
								</SidebarMenuAction>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-48 rounded-lg bg-white border p-1 shadow-md z-10" side={isMobile ? "bottom" : "right"} align={isMobile ? "end" : "start"}>
								{item.items.map(item => (
									<DropdownMenuItem key={item.title}>
										<Link href={item.href} className="flex items-center gap-2 w-full">
											<item.icon className="text-muted-foreground" />
											<span>{item.title}</span>
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
