"use client"
import { ChevronRight, LucideMessageSquareText, LucideTicket, LucideTicketCheck, LucideTicketMinus, MoreHorizontal } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "./sidebar";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

const items = [
	{
		title: "Support Tickets",
		icon: LucideTicket,
		href: "/dashboard/tickets",
		items: [
			{
				title: "Open",
				href: "/dashboard/tickets/open",
				icon: LucideTicketCheck
			}, {
				title: "Closed",
				href: "/dashboard/tickets/closed",
				icon: LucideTicketMinus
			}
		]
	}
]

const otherItems = [
	{
		title: "Customer Feedback",
		icon: LucideMessageSquareText,
		href: "",
		items: [
			{
				title: "Comments",
				href: "/dashboard/comments"
			}, {
				title: "Reviews",
				href: "/dashboard/reviews"
			}
		]
	}
]

export default function CustomerNavGroup() {
	const { isMobile } = useSidebar()

	return (
		<SidebarGroup>
			<SidebarGroupLabel>
				Customer Relations Center
			</SidebarGroupLabel>
			<SidebarMenu>
				{items.map(item => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton asChild>
							<Link href={item.href}>
								<item.icon />
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
				{otherItems.map(item => (
					<SidebarMenu key={item.title}>
						<Collapsible className="group/collapsible">
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton>
										<item.icon />
										<span>{item.title}</span>
										<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub>
										{item.items.map(item => (
											<SidebarMenuSubItem key={item.title}>
												<SidebarMenuSubButton asChild>
													<Link href={item.href}>{item.title}</Link>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					</SidebarMenu>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}