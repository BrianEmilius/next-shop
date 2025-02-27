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

	const hashedPassword = await bcrypt.hash(password, 10)
	const prisma = new PrismaClient()

	try {
		const credentials = await prisma.credentials.create({
			data: {
				type: "local",
				identifier: username,
				password: hashedPassword
			}
		})

		const user = await prisma.users.create({
			data: {
				users_has_credentials: {
					create: {
						credentials_id: credentials.id
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
