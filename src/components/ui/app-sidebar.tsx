import Link from "next/link"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton, } from "./sidebar"
import { LucideAlbum, LucideBook, LucideCircleArrowLeft, LucideHeartHandshake, LucidePackage, LucideSettings2, LucideTicketCheck, LucideUserCog } from "lucide-react"
import AdminNavGroup from "./admin-nav-group"
import FulfillmentNavGroup from "./fulfillment-nav-group"
import CustomerNavGroup from "./customer-nav-group"
import WarehouseNavGroup from "./warehouse-nav-group"

export default function AppSidebar() {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenuButton>
					<LucideAlbum className="text-2xl" />
					<Link href="/dashboard" className="w-full">
						Dashboard
					</Link>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent>
				<WarehouseNavGroup />
				<FulfillmentNavGroup />
				<CustomerNavGroup />
				<AdminNavGroup />
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