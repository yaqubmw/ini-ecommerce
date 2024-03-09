import ProductHero from "@/components/ProductHero";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import PaginationBar from "@/components/PaginationBar";

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);
  const pageSize = 4;
  const heroItemCount = 1;
  const totalItemCount = await prisma.product.count();
  const totalPage = Math.ceil((totalItemCount - heroItemCount) / pageSize);
  
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  return (
    <div className="mb-14 flex flex-col items-center">
      {currentPage === 1 && <ProductHero product={products[0]} key={products[0].id} />}
      <div className="mx-4 my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {totalPage > 1 && <PaginationBar currentPage={currentPage} totalPage={totalPage} />}
    </div>
  );
}
