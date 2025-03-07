"use client"

import { useActionState, useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import editRole from "@/actions/edit-role"
import { type Role, type Permission } from "@/types/access-controls"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { LucideEdit } from "lucide-react"

export default function EditRole({ role, permissions }: Readonly<{ role: Role, permissions: Array<Permission> }>) {
	const [formState, formAction, isPending] = useActionState(editRole, null)
	const [open, setOpen] = useState(false)

	useEffect(function () {
		console.log("permissions", permissions)
		console.log("role", role)
		if (formState?.success) {
			setOpen(false)
		}
	}, [formState])

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button aria-label="Edit" title="Edit" className="bg-transparent text-black hover:bg-transparent active:bg-transparent">
					<LucideEdit />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						Edit Role
					</SheetTitle>
					<SheetDescription>Add or remove permissions for this role</SheetDescription>
				</SheetHeader>
				<form action={formAction}>
					<div>
						<Label className="flex flex-col gap-2">
							Role name
							<Input type="text" name="role_name" defaultValue={role.role_name} />
						</Label>
					</div>
					<Separator className="my-4" />
					<div>
						{permissions.map(perm => (
							<Label key={perm.permission_name} className="w-full flex items-center gap-4 mb-2">
								<Checkbox name="permissions" value={perm.id} defaultChecked={role.permissions.some(rolePerm => rolePerm.id === perm.id)} />
								{perm.permission_name}
							</Label>
						))}
					</div>
					<Button type="submit">Save role</Button>
					<input type="hidden" name="role_id" value={role.id} />
				</form>
			</SheetContent>
		</Sheet>
	)
}
