import CreateProductForm from "@/components/dashboard/forms/create-product-form";
import Heading from "@/components/typography/heading";

export default async function CreateProductPage() {
	return (
		<>
			<Heading>Create new product</Heading>
			<CreateProductForm />
		</>
	)
}