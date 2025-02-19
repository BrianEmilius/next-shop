"use client"

import { useActionState, useEffect } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import createRole from "@/actions/create-role"

export default function AddRole() {
	const [formState, formAction, isPending] = useActionState(createRole, null)

	useEffect(function () {
		console.log("formState", formState)
	}, [formState])

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button>Add New Role</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Add New Role
						</DialogTitle>
					</DialogHeader>
					<form action={formAction}>
						<div>
							<Label>
								Role Name
								<Input type="text" name="role_name" />
							</Label>
						</div>
						<p className="text-red-500">{formState?._errors}</p>
						<Button type="submit">Add Role</Button>
					</form>
				</DialogContent>
			</Dialog>
		</>
	)
}
