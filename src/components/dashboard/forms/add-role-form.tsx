"use client"

import { useActionState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
						<DialogDescription>
							Enter the name of the new role. Role names must be unique.
						</DialogDescription>
					</DialogHeader>
					<form action={formAction}>
						<div className="mb-4">
							<Label className="flex flex-col gap-2">
								<span>Role Name</span>
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
