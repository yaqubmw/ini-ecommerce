import ProductHero from "@/components/ProductHero";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import PaginationBar from "@/components/PaginationBar";
import Slider from "@/components/Slider";

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);
  const pageSize = 4;
  const totalItemCount = await prisma.product.count();
  const totalPage = Math.ceil(totalItemCount / pageSize);

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div className="mb-14 flex flex-col items-center">
      {currentPage === 1 && <Slider products={products} />}
      <div className="mx-4 my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {totalPage > 1 && (
        <PaginationBar currentPage={currentPage} totalPage={totalPage} />
      )}
    </div>
  );
}
