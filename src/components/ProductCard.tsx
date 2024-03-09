import Link from "next/link";
import PriceTag from "./PriceTag";
import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={"/products/" + product.id}
      className="group card w-full overflow-hidden rounded-xl"
    >
      {isNew && (
        <div className="badge badge-primary badge-sm absolute right-0 top-2 z-20 rounded-badge rounded-r-none px-4 py-3 font-bold">
          New
        </div>
      )}
      <figure className="block overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={900}
          className="top-0 h-96 w-full object-cover object-center transition duration-500 group-hover:scale-125"
        />
      </figure>
      <div className="absolute bottom-0 z-10 flex w-full flex-col items-start justify-start bg-slate-900/65 px-2 py-4 text-white transition-colors duration-500 group-hover:bg-slate-900/85">
        <h2 className="flex items-center text-pretty text-xs font-semibold">
          {product.name}
        </h2>
        {/* <p>{product.description}</p> */}
        <PriceTag
          className="text-pretty text-base font-bold"
          price={product.price}
        />
      </div>
    </Link>
  );
}
