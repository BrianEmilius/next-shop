import Copy from "@/components/typography/copy"
import Heading from "@/components/typography/heading"
import { LucideSearch } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<LucideSearch size={256} className="text-gray-100" />
			<Heading>Oops!</Heading>
			<Copy>You've ventured into the digital void.</Copy>
			<Copy>The page you're looking for has either gone missing, never existed, or took an early retirement.</Copy>
			<Copy>But don't worry, you have options:</Copy>
			<ul>
				<li><strong>Double-check the URL</strong> &ndash; maybe it's just playing hide and seek?</li>
				<li><strong>Head back to the <Link href="/dashboard">Dashboard</Link></strong> &ndash; it's much cozier there.</li>
				<li><strong>Summon tech support</strong> &ndash; we're here to help.</li>
			</ul>
			<Copy>Either way, we appreciate your curiocity. Now go forth and browse responsibly.</Copy>
		</div>
	)
}
