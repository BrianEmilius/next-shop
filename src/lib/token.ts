"use server"
import { decodeProtectedHeader, importJWK, JWK, jwtVerify } from "jose"

export async function generateToken(userId: string) {
}

export async function verifyToken(token: string) {
	const protectedHeader = decodeProtectedHeader(token)
	const response = await fetch(String(protectedHeader.jku))
	const jwks = await response.json()
	return await jwtVerify(token, await importJWK(jwks.keys.find((key: JWK) => key.kid === protectedHeader.kid)))
}

export async function renewToken(token: string, fingerprint: string, sid: string) {
	
}