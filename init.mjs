import { PrismaClient } from "@prisma/client"
import { generateJWKPair } from "./src/lib/key"

const prisma = new PrismaClient()

const permissions = await prisma.permissions.createMany({
	data: [
		{ permission_name: "create:roles" },
		{ permission_name: "read:roles" },
		{ permission_name: "update:roles" },
		{ permission_name: "delete:roles" },
	]
})

const defaultRole = await prisma.roles.create({
	data: {
		role_name: "default",
		protected: 1,
	},
})

const adminRole = await prisma.roles.create({
	data: {
		role_name: "admin",
		protected: 1,
		permissions: {
			connect: [
				{ permission_name: "create:roles" },
				{ permission_name: "read:roles" },
				{ permission_name: "update:roles" },
				{ permission_name: "delete:roles" },
			]
		}
	}
})

const site_config = await prisma.site_config.create({
	data: {
		site_name: "NextJS Shop Showcase",
		site_tagline: "A proof-of-concept NextJS website"
	}
})

prisma.$disconnect()

await generateJWKPair()