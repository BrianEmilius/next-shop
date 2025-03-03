"use server"

import { cookies } from "next/headers"
import { verifyToken } from "@/lib/token"

export default async function isPermitted(permission: string) {
	const cookieStore = await cookies()
	const token = cookieStore.get("shop_token")
	if (!token) return false

	const verified = await verifyToken(token.value)

	if (!verified.payload.permissions.some((perm: string) => perm === permission))
		return false

	return true
}