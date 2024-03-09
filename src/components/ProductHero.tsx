import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductHeroProps {
  product: Product;
}

export default function ProductHero({ product }: ProductHeroProps) {
  return (
    <div className="hero mt-8 w-11/12 rounded-xl bg-gradient-to-tr from-white via-indigo-50 to-indigo-100 shadow lg:h-screen">
      <div className="hero-content flex-col items-center md:flex-row">
        <div className="w-full max-w-64 rounded object-cover object-center shadow-sm md:max-w-sm overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={800}
            className="h-full w-full hover:scale-110 transition-transform duration-500"
            priority
          />
        </div>
        <div className="flex flex-col items-center justify-center py-4 md:items-start">
          <h1 className="text-pretty text-center text-4xl font-bold leading-relaxed md:text-left">
            {product.name}
          </h1>
          <p className="text-pretty py-6 text-justify text-sm">
            {product.description}
          </p>
          <Link
            href={"/products/" + product.id}
            className="btn btn-primary max-w-32 text-pretty text-sm text-white"
          >
            Check It Out!
          </Link>
        </div>
      </div>
    </div>
  );
}
