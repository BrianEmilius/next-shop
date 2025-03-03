"use client"

import signin from "@/actions/signin"
import { useActionState, useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import generateFingerprint from "@/lib/fingerprint"

export default function SigninForm() {
	const [formState, formAction, isPending] = useActionState(signin, null)
	const [fingerprint, setFingerprint] = useState<string | null>(null)

	useEffect(function () {
		generateFingerprint().then(setFingerprint)
	}, [fingerprint])

	useEffect(function () {
		console.log("formState", formState)
	}, [formState])

	return (
		<form action={formAction}>
			<Label>
				Username or Email Address
				<Input type="text" name="identifier" />
			</Label>
			<Label>
				Password
				<Input type="password" name="password" />
			</Label>
			<Button type="submit" disabled={isPending} className="disabled:bg-gray-500">
				{isPending ? "Signing you in..." : "Sign in"}
			</Button>
			<input type="hidden" name="fingerprint" value={fingerprint ?? ""} />
		</form>
	)
}
