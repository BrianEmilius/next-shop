"use server"
import { PrismaClient } from "@prisma/client"
import { decodeProtectedHeader, importJWK, JWK, jwtVerify, SignJWT } from "jose"
import { type PrivateKey } from "@/types/keys"

export async function generateToken({ payload, expiration }: { payload: any, expiration: string }) {
	const privateKey = await getPrivateKey()
	return new SignJWT(payload)
		.setProtectedHeader({
			alg: "RS256",
			kid: privateKey.kid,
			jku: "http://localhost:3016/api/jwks.json",
		})
		.setAudience(payload.userId)
		.setIssuedAt()
		.setExpirationTime(expiration)
		.sign(await importJWK(privateKey))
}

export async function verifyToken(token: string) {
	const protectedHeader = decodeProtectedHeader(token)
	const response = await fetch(String(protectedHeader.jku))
	const jwks = await response.json()
	try {
		const verified = await jwtVerify(token, await importJWK(jwks.keys.find((key: JWK) => key.kid === protectedHeader.kid)))
		return verified
	} catch (error: any) {
		return false
	}
}

export async function decodeTokenPayload(token: string) {

}

async function getPrivateKey() {
	const prisma = new PrismaClient()
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
	}) as PrivateKey

	if (privateKey === null) {
		throw new Error("JWT Signing: No private key found")
	}

	return privateKey
}
