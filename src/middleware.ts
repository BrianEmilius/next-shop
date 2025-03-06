import { NextResponse, type NextRequest } from "next/server"
import { verifyToken } from "@/lib/token"

export async function middleware(request: NextRequest) {
	if (!request.cookies.has("shop_token") && request.cookies.has("shop_sid")) {
		return NextResponse.redirect(new URL("/renew?redirect=" + request.nextUrl.pathname, request.url))
	}

	if (!(await verifyToken(request.cookies.get("shop_token")!.value)) && request.cookies.has("shop_sid")) {
		return NextResponse.redirect(new URL("/renew?redirect=" + request.nextUrl.pathname, request.url))
	}

	if (request.nextUrl.pathname.includes("/profile")) {
		if (!request.cookies.has("shop_token") || !(await verifyToken((request.cookies.get("shop_token"))!.value)))
			return NextResponse.redirect(new URL("/signin", request.url))
	}

	if (request.nextUrl.pathname.includes("/admin")) {
		if (!request.cookies.has("shop_token"))
			return NextResponse.redirect(new URL("/signin", request.url))
		if (!(await verifyToken(request.cookies.get("shop_token")!.value)))
			return NextResponse.redirect(new URL("/", request.url))
	}
}

export const config = {
	matcher: ["/dashboard/:path*", "/profile/:path*"]
}
