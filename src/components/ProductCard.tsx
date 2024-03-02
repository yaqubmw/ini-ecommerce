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
    <Link href={"/products/" + product.id} className="card w-full rounded-none">
      <figure className="relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={900}
          className="top-0 z-10 h-56 w-full object-cover object-center"
        />
        {isNew && (
          <div className="badge badge-primary badge-sm absolute right-0 top-2 z-10 rounded-badge rounded-r-none px-4 py-3 font-bold">
            New
          </div>
        )}
      </figure>
      <div className="my-4 flex-col">
        <h2 className="card-title text-sm">{product.name}</h2>
        {/* <p>{product.description}</p> */}
        <PriceTag className="text-lg font-bold" price={product.price} />
      </div>
    </Link>
  );
}
