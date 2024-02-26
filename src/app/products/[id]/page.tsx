import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + " - IniEcommerce",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
      url: `/products/${product.id}`,
      type: "website",
    },
    alternates: {
      canonical: `/products/${product.id}`,
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col md:flex-row md:justify-between">
      <div className="h-[75vh] w-full md:h-[100vh] md:w-4/12">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={800}
          className="h-full w-full object-cover object-center"
          priority
        />
      </div>
      <div className="mx-4 my-6 md:mx-8 md:mb-12 md:mt-24 md:w-7/12">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-pretty py-6 text-justify text-sm">{product.description}</p>
        <div className="flex flex-col md:flex-row w-full items-center justify-between gap-3 rounded border p-2 shadow">
          <PriceTag
            price={product.price}
            className="text-lg font-bold"
          />
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
