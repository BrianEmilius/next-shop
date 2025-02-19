import CartPopover from "@/components/cart-popover"
import SecondaryNavigation from "@/components/secondary-navigation"
import SiteBreadcrumbs from "@/components/site-breadcrumbs"
import Container from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import SiteHeader from "@/components/ui/site-header"
import Link from "next/link"

export default async function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {

	return (
		<>
			<SiteHeader className="bg-black text-white">
				<Container className="flex justify-end">
					<ul className="flex gap-4">
						<li>
							<CartPopover />
						</li>
						<li>
							<Link href="/signin">Sign in</Link>
						</li>
					</ul>
				</Container>
				<Container className="flex justify-between">
					<Link href="/">My Shop</Link>
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
			<Container className="grid grid-cols-[1fr_4fr]">
				<SecondaryNavigation />
				<main>
					{children}
				</main>
			</Container>
		</>
	)
}
