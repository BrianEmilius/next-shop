import SigninForm from "@/components/signin-form"
import Heading from "@/components/typography/heading"
import Link from "next/link"

export default function SigninPage() {
	return (
		<>
			<Heading>Sign in</Heading>
			<SigninForm />
			<p>Don&apos;t have an account? <Link href="/signup">Sign up</Link></p>
		</>
	)
}
