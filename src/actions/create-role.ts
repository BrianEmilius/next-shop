"use server"

import isPermitted from "@/lib/check-permission"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

export default async function createRole(prevState: any, formData: FormData) {
	if (!(await isPermitted("write:roles"))) {
		return {
			_errors: ["You do not have permission to perform this action"]
		}
	}

	const role_name = formData.get("role_name")
	const schema = z.string().min(1, { message: "You must provide a role name" })
	const validated = schema.safeParse(role_name)

	if (!validated.success) {
		return validated.error.format()
	}

	try {
		const prisma = new PrismaClient()
		const role = await prisma.roles.create({
			data: {
				role_name
			}
		})

		console.log("role", role)

		return {
			success: true
		}
	} catch (error: any) {
		if (error.code === "P2002") {
			return {
				_errors: ["A role with this name already exists"]
			}
		}
	}
}
