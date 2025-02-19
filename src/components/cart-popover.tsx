import { FaShoppingCart } from "react-icons/fa"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import Heading from "./typography/heading"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function CartPopover() {
	return (
		<Popover>
			<PopoverTrigger className="flex items-center gap-1"><FaShoppingCart /><span className="sr-only">Cart</span> (2)</PopoverTrigger>
			<PopoverContent className="lg:min-w-[500px]">
				<Heading level={2}>
					Cart
				</Heading>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>#</TableHead>
							<TableHead>Product</TableHead>
							<TableHead className="text-right">Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell><Input type="number" defaultValue={1} className="w-24" /></TableCell>
							<TableCell>Fresh Salmon</TableCell>
							<TableCell className="text-right">$ 14.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell><Input type="number" defaultValue={7} className="w-24" /></TableCell>
							<TableCell>Evil Cheddar</TableCell>
							<TableCell className="text-right">$ 77.00</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<Button>Check out</Button>
			</PopoverContent>
		</Popover>
	)
}
