import BreadcrumbPaths from "@/components/breadcrumb-paths"
import AppSidebar from "@/components/ui/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger />
							<Separator orientation="vertical" className="mr-2 h-4" />
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem>
										You are here:
									</BreadcrumbItem>
									<BreadcrumbPaths />
								</BreadcrumbList>
							</Breadcrumb>
						</div>
					</header>
					<main className="p-4">
						{children}
					</main>
				</SidebarInset>
			</SidebarProvider>
		</>
	)
}
