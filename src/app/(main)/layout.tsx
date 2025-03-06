import CartPopover from "@/components/cart-popover"
import SecondaryNavigation from "@/components/secondary-navigation"
import SiteBreadcrumbs from "@/components/site-breadcrumbs"
import Container from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import SiteHeader from "@/components/ui/site-header"
import { getSiteConfig } from "@/lib/site-config"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const cookieStore = await cookies()
	const sidCookie = cookieStore.has("shop_sid")
	const site_config = await getSiteConfig()

	return (
		<>
			<SiteHeader className="bg-black text-white">
				<Container className="flex justify-end">
					<ul className="flex gap-4">
						<li>
							<CartPopover />
						</li>
						{sidCookie
							? (<li>
								<Link href="/profile">Profile</Link>
							</li>)
							: (<li>
								<Link href="/signin">Sign in</Link>
							</li>)
						}
					</ul>
				</Container>
				<Container className="flex justify-between">
					<Link href="/">{site_config.site_name}</Link>
					<nav>
						<ul className="flex gap-4">
							<li>
								<Input type="search" className="text-black bg-[rgba(255,255,255,0.5)] rounded-none p-0 px-2 py-1 h-fit border-none placeholder:text-black" placeholder="What are you looking for?" />
							</li>
							<li>
								<Link href="/">Link 1</Link>
							</li>
							<li>
								<Link href="/admin">Admin</Link>
							</li>
							<li>
								<Link href="/test">Test</Link>
							</li>
						</ul>
					</nav>
				</Container>
			</SiteHeader>
			<SiteBreadcrumbs />
			<Container className="grid grid-cols-[1fr_4fr] gap-4">
				<SecondaryNavigation />
				<main>
					{children}
				</main>
			</Container>
		</>
	)
}
