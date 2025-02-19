import createUser from "@/actions/create-user";
import Heading from "@/components/typography/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
	return (
		<>
			<Heading>Register</Heading>
			<form action={createUser} method="POST">
				<Input type="password" name="password" />
				<Button type="submit">Register</Button>
			</form>
		</>
	)
}