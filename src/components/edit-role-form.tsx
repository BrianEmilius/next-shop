"use client"

import { useActionState, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import editRole from "@/actions/edit-role"

export default function EditRole({ role, permissions }: Readonly<{ role: Role, permissions: Array<T> }>) {
	const [formState, formAction, isPending] = useActionState(editRole, null)
	const [open, setOpen] = useState(false)

	useEffect(function () {
		console.log("formState", formState)
		if (formState?.success) {
			setOpen(false)
		}
	}, [formState])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Edit</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Edit Role
					</DialogTitle>
					<DialogDescription>Add or remove permissions for this role</DialogDescription>
				</DialogHeader>
				<form action={formAction}>
					<div>
						<Label>
							Role name
							<Input type="text" name="role_name" defaultValue={role.role_name} />
						</Label>
					</div>
					<Separator className="my-4" />
					<div>
						{permissions.map(perm => (
							<Label key={perm.permission_name} className="w-full flex items-center gap-4 mb-2">
								<Checkbox name="permissions" value={perm.id} defaultChecked={role.roles_has_permissions.some(rolePerm => rolePerm.permissions_id === perm.id)} />
								{perm.permission_name}
							</Label>
						))}
					</div>
					<Button type="submit">Save role</Button>
					<input type="hidden" name="role_id" value={role.id} />
				</form>
			</DialogContent>
		</Dialog>
	)
}

interface Role {
	id: number
	role_name: string
}

interface Permissions { }
