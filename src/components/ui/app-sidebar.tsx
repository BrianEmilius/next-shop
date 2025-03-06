import Link from "next/link"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton, } from "./sidebar"
import { LucideAlbum, LucideBook, LucideCircleArrowLeft, LucideHeartHandshake, LucidePackage, LucideSettings2, LucideTicketCheck, LucideUserCog } from "lucide-react"
import AdminNavGroups from "./admin-nav-group"

const groups = [
	{
		title: "Warehouse",
		items: [
			{
				title: "Catalog",
				icon: <LucideBook />,
				items: [
					{
						title: "Products",
						href: "/dashboard/products"
					},{
						title: "Categories",
						href: "/dashboard/categories"
					},{
						title: "Brands",
						href: "/dashboard/brands"
					},{
						title: "Tags",
						href: "/dashboard/tags"
					}
				]
			}
		]
	},{
		title: "Fulfillment Center",
		items: [
			{
				title: "Orders",
				icon: <LucidePackage />,
				items: [
					{
						title: "Pending",
						href: "/dashboard/orders/pending"
					}, {
						title: "Completed",
						href: "/dashboard/orders/completed"
					}, {
						title: "Cancelled",
						href: "/dashboard/orders/cancelled"
					}
				]
			}
		]
	},{
		title: "Customer Relations Center",
		items: [
			{
				title: "Support Tickets",
				icon: <LucideTicketCheck />,
				items: [
					{
						title: "Open",
						href: "/dashboard/open-tickets"
					},{
						title: "Closed",
						href: "/dashboard/closed-tickets"
					}
				]
			},{
				title: "Customer Feedback",
				icon: <LucideHeartHandshake />,
				items: [
					{
						title: "Comments",
						href: "/dashboard/comments"
					},{
						title: "Reviews",
						href: "/dashboard/reviews"
					}
				]
			}
		]
	},{
		title: "Admin Options",
		items: [
			{
				title: "User Management",
				icon: <LucideUserCog />,
				items: [
					{
						title: "Roles",
						href: "/dashboard/roles"
					}, {
						title: "Users",
						href: "/dashboard/users"
					}
				]
			},{
				title: "Settings",
				icon: <LucideSettings2 />,
				items: [
					{
						title: "General",
						href: "/dashboard/settings"
					}
				]
			}
		]
	}
]

export default function AppSidebar() {
	return (
		<Sidebar className="" collapsible="icon">
			<SidebarHeader>
				<SidebarMenuButton>
					<LucideAlbum className="text-2xl" />
					<Link href="/dashboard" className="w-full">
						Dashboard
					</Link>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent>
				<AdminNavGroups groups={groups} />
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenuButton>
					<LucideCircleArrowLeft />
					<Link href="/">Back to website</Link>
				</SidebarMenuButton>
			</SidebarFooter>
		</Sidebar>
	)
}