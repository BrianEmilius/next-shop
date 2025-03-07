"use server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { z } from "zod"

export default async function createUser(prevState: any, formData: FormData) {
	const username = formData.get("username")
	const password = formData.get("password")

	const schema = z.object({
		username: z.string().min(1),
		password: z.string().min(1)
	})

	const validated = schema.safeParse({
		username,
		password
	})

	if (!validated.success) {
		return validated.error.format()
	}

	const hashedPassword = await bcrypt.hash(validated.data.password, 10)
	const prisma = new PrismaClient()

	try {
		const user = await prisma.users.create({
			data: {
				credentials: {
					create: {
						type: "local",
						identifier: validated.data.username,
						password: hashedPassword
					}
				},
				roles: {
					connect: {
						role_name: "default"
					}
				}
			}
		})

	} catch (error: any) {
		if (error.code === "P2002") {
			return {
				_errors: ["Username already exists"]
			}
		}

		throw error
	}
}
