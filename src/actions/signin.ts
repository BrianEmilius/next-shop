"use server"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { importJWK, SignJWT } from "jose"
import { redirect } from "next/navigation"

export default async function signin(prevState: any, formData: FormData) {
	const identifier = formData.get("identifier")
	const password = formData.get("password")

	const schema = z.object({
		identifier: z.string().min(1),
		password: z.string().min(1)
	})

	const validated = schema.safeParse({
		identifier,
		password
	})

	if (!validated.success) {
		return validated.error.format()
	}

	const prisma = new PrismaClient()
	/* const credentials = await prisma.credentials.findFirst({
		where: {
			identifier: validated.data.identifier
		},
		include: {
			users_has_credentials: true
		}
	}) */

	const user = await prisma.credentials.findFirst({
		where: {
			identifier: validated.data.identifier
		},
		include: {
			users_has_credentials: {
				include: {
					users: {
						include: {
							users_has_roles: {
								include: {
									roles: {
										include: {
											roles_has_permissions: {
												include: { permissions: true }
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	})



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

	const privateKey = await prisma.keys.findFirst({
		where: {
			type: "private"
		},
		orderBy: {
			id: "desc"
		},
		omit: {
			id: true,
			type: true,
		}
	})

	if (privateKey === null) {
		throw new Error("JWT Signing: No private key found")
	}

	const currentUser = user.users_has_credentials[0].users
	const permissions = currentUser.users_has_roles.flatMap(
		userRole => userRole.roles.roles_has_permissions.map(
			rolePermission => rolePermission.permissions
		)
	)

	const payload = {
		userId: String(currentUser.id),
		permissions: permissions.map(perm => perm.permission_name)
	}

	console.log("payload", payload)

	const jwt = new SignJWT(payload)
		.setProtectedHeader({
			alg: "RS256",
			kid: privateKey.kid,
			jku: "http://localhost:3000/api/jwks.json",
		})
		.setAudience(payload.userId)
		.setIssuedAt()
		.setExpirationTime("1h")
		.sign(await importJWK(privateKey))

	const cookieStore = await cookies()
	const date = new Date()
	cookieStore.set("shop_token", await jwt, { expires: date.setTime(date.getTime() + (60 * 60 * 1000)) })
	redirect("/")
}
