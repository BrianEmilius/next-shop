import Heading from "@/components/typography/heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { verifyToken } from "@/lib/token"
import { getCredentialsForUser, getUserByID } from "@/lib/user"
import { cookies } from "next/headers"

export async function generateMetadata() {
	const cookieStore = await cookies()
	const token = cookieStore.get("shop_token")

	const verifiedToken = await verifyToken(token!.value)
	const user: User = await getUserByID(Number(verifiedToken && verifiedToken.payload.userId))

	return {
		title: `Profile: ${user.firstname} ${user.lastname}`
	}
}

export default async function ProfilePage() {
	const cookieStore = await cookies()
	const token = cookieStore.get("shop_token")

	const verifiedToken = await verifyToken(token!.value)
	const user = await getUserByID(Number(verifiedToken && verifiedToken.payload.userId))
	const credentials = await getCredentialsForUser(Number(verifiedToken && verifiedToken.payload.userId))

	return (
		<>
			<Heading>Profile</Heading>
			<form>
				<div className="mb-4">
					<Label>
						Firstname
						<Input type="text" name="firstname" defaultValue={user && user.firstname} />
					</Label>
				</div>
				<div className="mb-4">
					<Label>
						Lastname
						<Input type="text" name="lastname" defaultValue={user && user.lastname} />
					</Label>
				</div>
				<Button type="submit">Save</Button>
			</form>
			{/* TODO: Create a list of credentials to edit / add / remove */}
			<Separator className="my-4" />
			<Heading level={2}>Credentials</Heading>
			{credentials.map(credential => (
				credential.credentials.type === "local" && (
					<form key={credential.credentials.id}>
						<Heading level={3}>Local username</Heading>
						<div>
							<Label>
								Username
								<Input type="text" name="username" defaultValue={credential.credentials.identifier} />
							</Label>
						</div>
					</form>
				)
			))}
		</>
	)
}

interface User {
	id: number
	firstname: string
	lastname: string
	users_has_roles: {
		users_id: number
		roles_id: number
		roles: {
			id: number
			role_name: string
			roles_has_permissions: {
				roles_id: number
				permissions_id: number
				permissions: {
					id: number
					permission_name: string
				}
			}
		}
	}
}