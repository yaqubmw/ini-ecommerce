import ProductHero from "@/components/ProductHero";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <ProductHero product={products[0]} key={products[0].id} />
      <div className="mx-4 my-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
