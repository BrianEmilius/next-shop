"use server"

import { cookies } from "next/headers"
import { verifyToken } from "@/lib/token"
import { JWTPayload, JWTVerifyResult } from "jose"

export async function isPermitted(permission: string) {
	const cookieStore = await cookies()
	const token = cookieStore.get("shop_token")
	if (!token) return false

	const verified: false | JWTVerifyResult<JWTPayload> = await verifyToken(token.value)

	if (!verified) return false

	const permissions: any = verified.payload.permissions

	if (!permissions.some((perm: string) => perm === permission))
		return false

	return true
}

export async function getPermissionsForUser(user: any) {
	return user.roles.flatMap(role => role.permissions).map(permission => permission.permission_name)
}
