import { ChevronRight, LucideSettings2, LucideUserCog } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "./sidebar"
import Link from "next/link"

const items = [
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
	}, {
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

export default function AdminNavGroup() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>
				Admin Options
			</SidebarGroupLabel>
			{items.map(item => (
				<SidebarMenu key={item.title}>
					<Collapsible className="group/collapsible">
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton>
									{item.icon}
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
		</SidebarGroup>
	)
}

interface NavGroup {
	title: string
	items: {
		title: string
		icon: React.ReactNode
		items: {
			title: string
			href: string
		}[]
	}[]
}