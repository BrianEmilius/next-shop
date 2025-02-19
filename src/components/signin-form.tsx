"use client"

import signin from "@/actions/signin"
import { useActionState, useEffect } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function SigninForm() {
	const [formState, formAction, isPending] = useActionState(signin, null)

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
		</form>
	)
}
