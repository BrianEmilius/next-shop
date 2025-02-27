import Heading from "@/components/typography/heading"
import { PrismaClient } from "@prisma/client"
import Link from "next/link"

export default async function Home() {
  const prisma = new PrismaClient()

  const products = await prisma.products.findMany()

  await prisma.$disconnect()

  return (
    <>
      <Heading>Snacks</Heading>
      {products.map((product) => (
        <Link href={"/product/" + product.sku} key={product.id}>
        <div>
          <h2>{product.productname}</h2>
          <p>{Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(product.price))}</p>
        </div>
        </Link>
      ))}
    </>
  )
}
