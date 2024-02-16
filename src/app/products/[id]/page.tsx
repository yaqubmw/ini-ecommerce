import prisma from "@/lib/db/prisma";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await prisma.product.findUnique({ where: { id } });
}
