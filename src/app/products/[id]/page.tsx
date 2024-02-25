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
    <div className="flex flex-col lg:flex-row lg:justify-between">
      <div className="h-[75vh] w-full lg:h-[100vh] lg:w-4/12">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={800}
          className="h-full w-full object-cover object-top"
          priority
        />
      </div>
      <div className="mx-4 my-6 lg:mx-8 lg:mb-12 lg:mt-24 lg:w-7/12">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <PriceTag
          price={product.price}
          className="mt-4 text-lg font-semibold text-primary"
        />
        <p className="text-pretty py-6 text-justify">{product.description}</p>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}
