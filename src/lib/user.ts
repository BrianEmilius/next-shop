import { PrismaClient } from "@prisma/client";

export async function getUserByID(id: number) {
	const prisma = new PrismaClient()

	const user = await prisma.users.findFirst({
		where: {
			id
		},
		include: {
			roles: {
				include: {
					permissions: true
				}
			}
		}
	})

	prisma.$disconnect()

	return user
}

export async function getUserByIdentifier(identifier: string) {
	const prisma = new PrismaClient()

	const user = await prisma.credentials.findUnique({
		where: {
			identifier
		},
		include: {
			users: {
				include: {
					roles: {
						include: {
							permissions: true
						}
					}
				}
			},
		}
	})
	console.log(user)
	prisma.$disconnect()

	return user
}

export async function getCredentialsForUser(id: number) {
	const prisma = new PrismaClient()

	const credentials = await prisma.credentials.findMany({
		where: {
			usersId: id
		},
	})

	prisma.$disconnect()

	return credentials
}
