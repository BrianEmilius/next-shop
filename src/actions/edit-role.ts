"use server"

import { isPermitted } from "@/lib/permission"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

export default async function editRole(prevState: any, formData: FormData) {
	if (!(await isPermitted("update:roles"))) {
		return {
			_errors: ["You do not have permission to perform this action"]
		}
	}

	const role_name = formData.get("role_name") as string
	const role_id = formData.get("role_id") as string
	const permissions = formData.getAll("permissions") as string[]

	const prisma = new PrismaClient()

	const role = await prisma.roles.findUnique({
		where: { id: parseInt(role_id) },
		include: { roles_has_permissions: true }
	})

	if (!role) {
		return {
			_errors: ["Role not found"]
		}
	}

	try {
		await prisma.roles.update({
			where: { id: parseInt(role_id) },
			data: {
				role_name
			}
		})
	} catch (error) {
		console.log(error)
		return {
			_errors: ["idk"]
		}
	}

	try {
		await prisma.roles_has_permissions.deleteMany({
			where: {
				roles_id: role.id
			}
		})

		await prisma.roles_has_permissions.createMany({
			data: permissions.map((permission) => ({
				roles_id: role.id,
				permissions_id: parseInt(permission)
			}))
		})
	} catch (error) {
		console.log(error)
		return {
			_errors: ["idk idk"]
		}
	}

	revalidatePath("/admin/roles")

	return {
		success: true
	}
}
