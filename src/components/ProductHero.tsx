import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductHeroProps {
  product: Product;
}

export default function ProductHero({ product }: ProductHeroProps) {
  return (
    <div className="hero rounded bg-slate-100 lg:h-screen">
      <div className="hero-content flex-col items-center md:flex-row">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={600}
          height={800}
          className="w-full max-w-64 rounded object-cover object-center shadow-sm md:max-w-sm"
          priority
        />
        <div className="flex flex-col justify-center py-4 items-center md:items-start">
          <h1 className="text-center text-5xl font-bold md:text-left">
            {product.name}
          </h1>
          <p className="text-pretty py-6 text-justify">{product.description}</p>
          <Link
            href={"/products/" + product.id}
            className="btn btn-primary max-w-32"
          >
            Check It Out!
          </Link>
        </div>
      </div>
    </div>
  );
}
