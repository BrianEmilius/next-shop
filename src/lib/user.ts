import { PrismaClient } from "@prisma/client";

export async function getUserByID(id: number) {
	const prisma = new PrismaClient()

	const user = await prisma.users.findUnique({
		where: {
			id
		},
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
	})

	prisma.$disconnect()

	return user
}

export async function getUserByIdentifier(identifier: string) {
	const prisma = new PrismaClient()

	const user = await prisma.credentials.findFirst({
		where: {
			identifier: identifier
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

	prisma.$disconnect()

	return user
}

export async function getCredentialsForUser(id: number) {
	const prisma = new PrismaClient()

	const credentials = await prisma.users_has_credentials.findMany({
		where: {
			users_id: id
		},
		include: {
			credentials: true
		}
	})

	prisma.$disconnect()

	return credentials
}
