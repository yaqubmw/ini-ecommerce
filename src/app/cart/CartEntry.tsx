"use client";

import { CartItemWithProducts } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { setProductQty } from "./actions";

interface CartEntryProps {
  cartItem: CartItemWithProducts;
}

export default function CartEntry({
  cartItem: { product, quantity },
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();

  const handleQty = async (newQty: number) => {
    startTransition(async () => {
      await setProductQty(product.id, newQty);
    });
  };

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 md:flex-row">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
        className="my-3 h-24 w-24 rounded-md object-cover md:h-36 md:w-36"
      />
      <div className="flex max-w-72 flex-col gap-3 md:justify-center md:px-4 md:py-2">
        <Link href={"/products/" + product.id} className="font-bold">
          {product.name}
        </Link>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            {formatPrice(product.price)}
          </div>
          <div className="flex items-center gap-2">
            <span className="mx-4 text-sm">x</span>
            <select
              className="select select-bordered select-xs w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQty = parseInt(e.currentTarget.value);
                handleQty(newQty);
              }}
            >
              <option value={0}>0 (Remove)</option>
              {quantityOptions}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm font-semibold">
          Subtotal: {formatPrice(product.price * quantity)}
        </div>
      </div>
    </div>
  );
}
