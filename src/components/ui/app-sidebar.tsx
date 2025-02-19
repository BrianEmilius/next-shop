import Link from "next/link"
import Heading from "../typography/heading"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, } from "./sidebar"

export default function AppSidebar() {
	return (
		<Sidebar className="">
			<SidebarHeader>
				<Heading>My Shop</Heading>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<Link href="/admin/roles">Roles</Link>
				</SidebarGroup>
				<SidebarGroup>
					Something
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				Footer
			</SidebarFooter>
		</Sidebar>
	)
}