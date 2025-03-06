import Link from "next/link"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton, } from "./sidebar"
import { LucideAlbum, LucideCircleArrowLeft, LucideUserCog } from "lucide-react"
import AdminNavGroups from "./admin-nav-group"

const groups = [
	{
		title: "Admin Options",
		items: [
			{
				title: "User Management",
				icon: <LucideUserCog />,
				items: [
					{
						title: "Roles",
						href: "/admin/roles"
					}, {
						title: "Users",
						href: "/admin/users"
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
					<Link href="/admin" className="w-full">
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