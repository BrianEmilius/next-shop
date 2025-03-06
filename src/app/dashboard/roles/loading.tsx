"use client"

import Heading from "@/components/typography/heading"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Loading() {
	return (
		<>
			<Heading>Roles</Heading>
			<Skeleton className="h-8 w-32 rounded-lg" />
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-4/5">Role name</TableHead>
						<TableHead colSpan={2} className="w-1/5">Options</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell><Skeleton className="h-4 w-64 rounded-md" /></TableCell>
						<TableCell><Skeleton className="h-8 w-16 rounded-md" /></TableCell>
						<TableCell><Skeleton className="h-8 w-16 rounded-md" /></TableCell>
					</TableRow>
					<TableRow>
						<TableCell><Skeleton className="h-4 w-32 rounded-md" /></TableCell>
						<TableCell><Skeleton className="h-8 w-16 rounded-md" /></TableCell>
						<TableCell><Skeleton className="h-8 w-16 rounded-md" /></TableCell>
					</TableRow>
					<TableRow>
						<TableCell><Skeleton className="h-4 w-24 rounded-md" /></TableCell>
						<TableCell><Skeleton className="h-8 w-16 rounded-md" /></TableCell>
						<TableCell><Skeleton className="h-8 w-16 rounded-md" /></TableCell>
					</TableRow>
					<TableRow>
						<TableCell><Skeleton className="h-4 w-64 rounded-md" /></TableCell>
						<TableCell><Skeleton className="h-8 w-16 rounded-md" /></TableCell>
						<TableCell><Skeleton className="h-8 w-16 rounded-md" /></TableCell>
					</TableRow>
					<TableRow>
						<TableCell><Skeleton className="h-4 w-72 rounded-md" /></TableCell>
						<TableCell><Skeleton className="h-8 w-16 rounded-md" /></TableCell>
						<TableCell><Skeleton className="h-8 w-16 rounded-md" /></TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	)
}
