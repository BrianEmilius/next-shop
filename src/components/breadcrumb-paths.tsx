"use client"

import { usePathname } from "next/navigation"
import { Fragment } from "react"
import { BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb"
import Link from "next/link"

export default function BreadcrumbPaths() {
	const paths = usePathname()
	const pathNames = paths.split("/").filter(path => path)

	return pathNames.map((path, i) => (
		<Fragment key={path}>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				{i === pathNames.length - 1
					? <BreadcrumbPage>{path[0].toUpperCase() + path.slice(1, path.length)}</BreadcrumbPage>
					: <Link href={path}>{path[0].toUpperCase() + path.slice(1, path.length)}</Link>
				}
			</BreadcrumbItem>
		</Fragment>
	))
}
