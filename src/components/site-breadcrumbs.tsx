"use client"
import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb"
import Container from "./ui/container"
import { Fragment } from "react"
import Link from "next/link"

export default function SiteBreadcrumbs() {
	const paths = usePathname()
	const pathNames = paths.split("/").filter(path => path)

	return (
		<Container>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						You are here:
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link href="/">Home</Link>
					</BreadcrumbItem>
					{pathNames.map((path, i) => (
						<Fragment key={path}>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								{i === pathNames.length - 1
									? <BreadcrumbPage>{path[0].toUpperCase() + path.slice(1, path.length)}</BreadcrumbPage>
									: <Link href={path}>{path[0].toUpperCase() + path.slice(1, path.length)}</Link>
								}
							</BreadcrumbItem>
						</Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</Container>
	)
}
