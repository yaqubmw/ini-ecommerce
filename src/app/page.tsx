import PriceTag from "@/components/PriceTag";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="hero h-screen rounded bg-slate-100">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={600}
            height={800}
            className="w-full max-w-64 rounded object-cover object-center shadow-sm lg:max-w-sm"
            priority
          />
          <div>
            <h1 className="text-5xl font-bold">{products[0].name}</h1>
            <p className="text-pretty py-6 text-justify">
              {products[0].description}
            </p>
            <Link
              href={"/products/" + products[0].id}
              className="btn btn-primary"
            >
              Check It Out!
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-4 my-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
