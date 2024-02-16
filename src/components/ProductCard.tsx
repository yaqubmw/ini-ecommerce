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
      className="card w-full rounded bg-white shadow transition-shadow hover:shadow-lg"
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={900}
          className="h-64 w-full object-cover object-center"
        />
      </figure>
      <div className="card-body flex-col justify-between">
        <h2 className="card-title text-lg">
          {product.name}
          {isNew && <div className="badge badge-secondary badge-sm">New</div>}
        </h2>
        {/* <p>{product.description}</p> */}
        <PriceTag
          className="text-sm font-semibold text-primary"
          price={product.price}
        />
      </div>
    </Link>
  );
}
