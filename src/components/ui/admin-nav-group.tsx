import { ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "./sidebar"
import Link from "next/link"

export default function AdminNavGroups({ groups }: Readonly<{ groups: Array<NavGroup> }>) {
	return groups.map(group => (
		<SidebarGroup key={group.title}>
			<SidebarGroupLabel>
				{group.title}
			</SidebarGroupLabel>
			{group.items.map(item => (
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
	))
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