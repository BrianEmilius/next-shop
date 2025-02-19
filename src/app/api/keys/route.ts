import { PrismaClient } from "@prisma/client"
import { calculateJwkThumbprint, exportJWK, generateKeyPair } from "jose"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
	const { publicKey, privateKey } = await generateKeyPair("RS256")
	const exportedPublicKey = await exportJWK(publicKey)
	const exportedPrivateKey = await exportJWK(privateKey)

	const KID = await calculateJwkThumbprint(exportedPublicKey, "sha512")

	exportedPublicKey.kid = KID
	exportedPrivateKey.kid = KID
	exportedPublicKey.alg = "RS256"
	exportedPrivateKey.alg = "RS256"

	const prisma = new PrismaClient()

	await prisma.keys.create({
		data: {
			...exportedPublicKey,
			type: "public"
		}
	})

	await prisma.keys.create({
		data: {
			...exportedPrivateKey,
			type: "private"
		}
	})

	return NextResponse.json({ ok: true })
}
