"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { useReducer } from "react"

function reduceInputStates(state: any, action: any) {
	switch (action.type) {
		case "SET_PRODUCT_NAME":
			return { ...state, productName: action.payload, canonicalName: action.payload.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "") }
		case "SET_CANONICAL_NAME":
			return { ...state, canonicalName: action.payload }
		case "SET_PRICE":
			return { ...state, price: parseFloat(action.payload).toFixed(2) }
		default:
			return state
	}
}
export default function CreateProductForm() {
	const [inputStates, setInputStates] = useReducer(reduceInputStates, { productName: "", canonicalName: "", price: 0.00 })
	return (
		<form>
			<div className="mb-4">
				<Label className="flex flex-col gap-2">
					Product Name
					<Input type="text" name="procuct_name" value={inputStates.productName} onChange={(e) => setInputStates({ type: "SET_PRODUCT_NAME", payload: e.target.value })} />
				</Label>
			</div>
			<div className="mb-4">
				<Label className="flex flex-col gap-2">
					Canonical name
					<Input type="text" disabled name="canonical_name" value={inputStates.canonicalName} className="" />
				</Label>
			</div>
			<div className="mb-4">
				<Label className="flex flex-col gap-2">
					<abbr title="Stock Keeping Unit">SKU</abbr>
					<Input type="text" name="sku" />
				</Label>
			</div>
			<div className="mb-4">
				<Label className="flex flex-col gap-2">
					Price
					<Input type="number" name="price" step="any" value={inputStates.price} onChange={e => setInputStates({ type: "SET_PRICE", payload: e.target.value })} />
				</Label>
			</div>
		</form>
	)
}