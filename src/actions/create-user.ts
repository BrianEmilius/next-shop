"use server"
import bcrypt from "bcrypt"

export default async function createUser(formData: FormData) {
	const password = formData.get("password")
	const hashedPassword = await bcrypt.hash(password, 10)
	console.log("hashedPassword", hashedPassword)
}
