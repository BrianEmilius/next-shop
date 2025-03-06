"use server"

import { getPermissionsForUser } from "@/lib/permission"
import { generateToken, verifyToken } from "@/lib/token"
import { getUserByID } from "@/lib/user"
import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function refreshToken(fingerprint: string, sendTo: string) {
	const cookieStore = await cookies()
	const sid = cookieStore.get("shop_sid")!.value
	const prisma = new PrismaClient()

	const refreshToken = await prisma.tokens.findFirst({
		where: {
			sid,
			fingerprint
		}
	})

	if (!refreshToken) redirect("/signin")

	const verifiedToken = await verifyToken(refreshToken.token!)

	if (verifiedToken && verifiedToken.payload.fingerprint !== fingerprint) {
		redirect("/signin")
	}

	const user = await getUserByID(Number(verifiedToken.payload.userId))

	if (!user) redirect("/signin")

	const permissions = await getPermissionsForUser(user)

	const jwt = await generateToken({ payload: { userId: verifiedToken.payload.userId, permissions }, expiration: "10m" })
	cookieStore.set("shop_token", jwt)
	redirect(sendTo)
}
