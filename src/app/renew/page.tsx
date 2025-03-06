"use client"
import refreshToken from "@/actions/refresh-token"
import Copy from "@/components/typography/copy"
import generateFingerprint from "@/lib/fingerprint"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import BarLoader from "react-spinners/BarLoader"

export default function RenewPage() {
	const searchParams = useSearchParams()
	useEffect(function () {
		const redirect = searchParams.get("redirect") || "/"
		generateFingerprint()
			.then(fingerprint => refreshToken(fingerprint, redirect))
	}, [])

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<Copy><BarLoader height={8} width={300} /></Copy>
		</div>
	)
}
