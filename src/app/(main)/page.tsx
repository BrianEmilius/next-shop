import Heading from "@/components/typography/heading"
import { PrismaClient } from "@prisma/client"

export default async function Home() {
  const prisma = new PrismaClient()

  const products = await prisma.products.findMany()

  await prisma.$disconnect()

  console.log("products", products)

  return (
    <Heading>Snacks</Heading>
  )
}
