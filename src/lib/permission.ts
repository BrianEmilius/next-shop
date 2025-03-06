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
	const permissions = user!.users_has_roles.flatMap(
		(userRole: { roles: { roles_has_permissions: any[] } }) => userRole.roles.roles_has_permissions.map(
			rolePermission => rolePermission.permissions
		)
	)

	return permissions.map((perm: Permission) => perm.permission_name)
}
/* 
interface User {
	id: number
	users_has_roles: Array<object>
} */

interface Permission {
	id: number
	permission_name: string
}
