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
      <div className="mx-4 my-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
