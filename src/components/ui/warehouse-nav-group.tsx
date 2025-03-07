import { ChevronRight, LucideBook } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "./sidebar"
import Link from "next/link"

const items = [
	{
		title: "Catalog",
		icon: <LucideBook />,
		items: [
			{
				title: "Products",
				href: "/dashboard/products"
			}, {
				title: "Categories",
				href: "/dashboard/categories"
			}, {
				title: "Brands",
				href: "/dashboard/brands"
			}, {
				title: "Tags",
				href: "/dashboard/tags"
			}
		]
	}
]

export default function WarehouseNavGroup() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>
				Warehouse
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
