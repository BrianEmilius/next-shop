import { generateJWKPair } from "@/lib/key"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
	try {
		await generateJWKPair()
		return NextResponse.json({ ok: true })
	} catch (error: any) {
		if (error instanceof Error) {
			console.log(error.stack)
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}
