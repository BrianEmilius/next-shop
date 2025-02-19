import Heading from "@/components/typography/heading"
import { notFound } from "next/navigation"

export default function TestPage() {
	notFound()
	return <Heading>Test</Heading>
}