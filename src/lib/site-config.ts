"use server"

import { PrismaClient } from "@prisma/client"

export async function getSiteConfig() {
	const prisma = new PrismaClient()
	const site_config = await prisma.site_config.findFirst()
	prisma.$disconnect()
	return site_config
}
