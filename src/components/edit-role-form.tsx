"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"

export default function EditRole({ role, permissions }: Readonly<{ role: Role, permissions: Array<T> }>) {
	const [assignedPerms, setAssignedPerms] = useState(role.roles_has_permissions.flatMap(rolePerm => rolePerm.permissions))
	const [allPerms, setAllPerms] = useState(permissions.filter(permItem => !assignedPerms.some(assItem => assItem.permission_name === permItem.permission_name)))
	const allRef = useRef(null)
	const assignedRef = useRef(null)

	async function assign() {
		//console.log("test", allRef.current.selectedOptions)
		Array.from(allRef.current.selectedOptions).forEach(selectedOption => setAssignedPerms(prev => [...prev, JSON.parse(selectedOption.value)]))
		//setAssignedPerms(prev => [...prev, allRef])
	}

	async function remove() { }

	useEffect(function () {
		//console.log("remaining permissions for ", role.role_name, permissions.filter(perm => assignedPerms.some(perm.permission_name)))
		//console.log("assignedPerms for ", role.role_name, assignedPerms)
		//console.log("test for ", role.role_name, permissions.filter(permItem => !assignedPerms.some(assItem => assItem.permission_name === permItem.permission_name)))
	}, [])

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Edit</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Edit Role
					</DialogTitle>
					<DialogDescription>Something</DialogDescription>
				</DialogHeader>
				<form>
					<div>
						<Label>
							Role name
							<Input type="text" name="role_name" defaultValue={role.role_name} />
						</Label>
					</div>
					<Separator className="my-4" />
					<div className="flex gap-4">
						<Label>
							Assigned permissions
							<select name="assigned_perms" multiple={true} className="w-full" ref={assignedRef}>
								{assignedPerms.map(perm => (
									<option key={perm.permission_name} value={JSON.stringify(perm)}>{perm.permission_name}</option>
								))}
							</select>
						</Label>
						<div className="flex flex-col justify-center">
							<Button type="button" onClick={assign}>&lt;&lt;</Button>
							<Button type="button" onClick={remove}>&gt;&gt;</Button>
						</div>
						<Label>
							All permissions
							<select name="all_perms" multiple={true} className="w-full" ref={allRef}>
								{allPerms.map(perm => (
									<option key={perm.permission_name} value={JSON.stringify(perm)}>{perm.permission_name}</option>
								))}
							</select>
						</Label>
					</div>
					<Button type="submit">Save role</Button>
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