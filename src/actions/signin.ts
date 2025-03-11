"use server"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { generateToken } from "@/lib/token"
import { getUserByIdentifier } from "@/lib/user"
import { getPermissionsForUser } from "@/lib/permission"

export default async function signin(prevState: any, formData: FormData) {
	const identifier = formData.get("identifier")
	const password = formData.get("password")
	const fingerprint = formData.get("fingerprint")

	const schema = z.object({
		identifier: z.string().min(1),
		password: z.string().min(1),
		fingerprint: z.string().min(10)
	})

	const validated = schema.safeParse({
		identifier,
		password,
		fingerprint
	})

	if (!validated.success) {
		return validated.error.format()
	}

	const user = await getUserByIdentifier(validated.data.identifier)

	if (!user) {
		return {
			_errors: ["User not found"]
		}
	}

	if (!(await bcrypt.compare(validated.data.password, String(user!.password)))) {
		return {
			_errors: ["Incorrect username or password"]
		}
	}

	const currentUser = user.users
	const permissions = await getPermissionsForUser(currentUser)

	const payload = {
		userId: String(currentUser.id),
		permissions
	}

	const jwt = await generateToken({ payload, expiration: "10m" })
	const refresh_token = await generateToken({ payload: { userId: String(currentUser.id), identifier: validated.data.identifier, fingerprint }, expiration: "30d" })

	const cookieStore = await cookies()
	const date = new Date()
	cookieStore.set("shop_token", jwt)

	const array = new Uint8Array(32);
	crypto.getRandomValues(array);
	const sessionID = btoa(String.fromCharCode(...array))

	const prisma = new PrismaClient()

	await prisma.tokens.create({
		data: {
			token: refresh_token,
			sid: sessionID,
			fingerprint: validated.data.fingerprint,
			usersId: currentUser.id
		}
	})

	prisma.$disconnect()

	cookieStore.set("shop_sid", sessionID, { expires: date.setTime(date.getTime() + (1000 * 60 * 60 * 24 * 30)) })

	redirect("/")
}
