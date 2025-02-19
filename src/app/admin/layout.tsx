import Link from "next/link"

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<header>
				<nav>
					<ul>
						<li>
							<Link href="/admin">Admin</Link>
						</li>
						<li>
							<Link href="/admin/roles">Roles</Link>
						</li>
					</ul>
				</nav>
			</header>
			<main>
				{children}
			</main>
		</>
	)
}
