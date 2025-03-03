"use client"
import createUser from "@/actions/create-user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useActionState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import FormStatusText from "@/components/typography/form-status-text"
import Link from "next/link"


export default function SignupForm() {
	const [formState, formAction, isPending] = useActionState(createUser, null)

	useEffect(function () {
		console.log("formState", formState)
	}, [formState])

	return (
		<form action={formAction}>
			<Label className="block mb-4">
				Username
				<Input type="text" name="username" />
				<FormStatusText>{formState?.username?._errors}</FormStatusText>
			</Label>
			<Label className="block mb-4">
				Password
				<Input type="password" name="password" />
				<FormStatusText>{formState?.password?._errors}</FormStatusText>
			</Label>
			<Label className="flex items-center gap-4 mb-4">
				<Checkbox name="terms" /> <span>I accept the <Link href="/terms-and-conditions">terms and conditions</Link></span>
			</Label>
			<FormStatusText>{formState?._errors}</FormStatusText>
			<Button type="submit" disabled={isPending} className="disabled:bg-gray-500">{isPending ? "Signing you up..." : "Register"}</Button>
		</form>
	)
}