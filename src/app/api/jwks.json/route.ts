import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

export async function GET(request: Request) {
	const prisma = await new PrismaClient()

	const publicKeys = await prisma.keys.findMany({
		where: {
			type: "public"
		},
		select: {
			kid: true,
			kty: true,
			alg: true,
			n: true,
			e: true
		}
	})

	return NextResponse.json({
		keys: publicKeys
	})
}
