import Heading from "@/components/typography/heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LucideChevronDown, LucideChevronUp } from "lucide-react"
import Link from "next/link"

export default async function ProductsPage() {
	return (
		<>
			<Heading>Products</Heading>
			<Link href="products/create" className="bg-black text-white py-2 px-4 block w-fit rounded-md my-2">Create new product</Link>
			<div className="flex">
				<Label className="flex flex-col gap-2">
					Filter
					<Input type="search" placeholder="Product name, sku, etc" className="border-r-none" />
				</Label>
				<Label className="flex flex-col gap-2">
					Items per page
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="10" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="50">50</SelectItem>
							<SelectItem value="100">100</SelectItem>
							<SelectItem value="all">All</SelectItem>
						</SelectContent>
					</Select>
				</Label>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="flex items-center gap-2">Product name <Button className="bg-transparent p-0 text-black hover:bg-transparent"><LucideChevronUp /></Button></TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Quantity</TableHead>
						<TableHead colSpan={2}>Options</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>

				</TableBody>
			</Table>
		</>
	)
}