import { decodeProtectedHeader, importJWK, JWK, jwtVerify } from "jose"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.includes("/admin")) {
		if (!request.cookies.has("shop_token"))
			return NextResponse.redirect(new URL("/", request.url))
		if (!(await verifyToken((request.cookies.get("shop_token"))!.value)))
			return NextResponse.redirect(new URL("/", request.url))
	}
}

export const config = {
	matcher: ["/admin/:path*"]
}

export async function verifyToken(token: string) {
	const protectedHeader = decodeProtectedHeader(token)
	const response = await fetch(String(protectedHeader.jku))
	const jwks = await response.json()
	return await jwtVerify(token, await importJWK(jwks.keys.find((key: JWK) => key.kid === protectedHeader.kid)))
}
