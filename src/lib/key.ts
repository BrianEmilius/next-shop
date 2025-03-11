"use server"
import { calculateJwkThumbprint, exportJWK, generateKeyPair } from "jose"
import { PrismaClient } from "@prisma/client"

export async function generateJWKPair() {
	try {
		const { publicKey, privateKey } = await generateKeyPair("RS256")
		const exportedPublicKey = await exportJWK(publicKey)
		const exportedPrivateKey = await exportJWK(privateKey)
	
		const KID = await calculateJwkThumbprint(exportedPublicKey, "sha512")
	
		exportedPublicKey.kid = KID
		exportedPrivateKey.kid = KID
		exportedPublicKey.alg = "RS256"
		exportedPrivateKey.alg = "RS256"
	
		const prisma = new PrismaClient()
	
		await prisma.keys.createMany({
			data: [
				{
					...exportedPublicKey,
					type: "public"
				}, {
					...exportedPrivateKey,
					type: "private"
				}
			]
		})
		prisma.$disconnect()
	} catch (error: any) {
		throw new Error(error)
	}
}
