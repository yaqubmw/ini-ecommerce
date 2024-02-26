"use client";

import { CartItemWithProducts } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { setProductQty } from "./actions";
import ButtonQty from "@/components/ButtonQty";

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

  const incrementQty = () => {
    const newQty = quantity + 1;
    handleQty(newQty);
    // if (newQty <= product.stock) {
    //   handleQty(newQty);
    // } else {
    //   console.warn("Exceeds available stocks.");
    // }
  };

  const decrementQty = () => {
    const newQty = Math.max(quantity - 1, 0);
    handleQty(newQty);
  };

  const removeProduct = () => {
    const newQty = 0;
  };

  // const isMaxQuantity = quantity === product.stock;
  const isMinQuantity = quantity === 1;

  const quantityOptions: JSX.Element[] = [];
  quantityOptions.push(
    <div className="my-2 inline-flex items-center gap-2">
      <ButtonQty
        className={`${isMinQuantity ? "cursor-not-allowed touch-none opacity-50" : ""}`}
        onClick={decrementQty}
        disabled={isMinQuantity}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </ButtonQty>
      <div className="flex w-6 justify-center text-sm font-medium">
        {quantity}
      </div>
      <ButtonQty onClick={incrementQty}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </ButtonQty>
    </div>,
  );

  return (
    <div className="flex w-full flex-col items-center gap-3 md:flex-row">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
        className="h-24 w-24 rounded-md object-cover md:h-36 md:w-36"
      />
      <div className="flex w-full max-w-96 flex-col gap-3 md:w-full md:justify-center md:px-4 md:py-2">
        <Link
          href={"/products/" + product.id}
          className="text-center font-bold md:text-left"
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-between gap-2 rounded border p-2 shadow-md">
          <div className="flex w-7/12 flex-col justify-between">
            <div id="price" className="text-sm font-medium">
              {formatPrice(product.price)}
            </div>
            <div>
              <span className="text-xs font-semibold">Subtotal: </span>
            </div>
            <div id="subtotal" className="flex items-center">
              {isPending && (
                <span className="loading loading-ring loading-xs" />
              )}
              {!isPending && (
                <span className="text-xs font-semibold">
                  {formatPrice(product.price * quantity)}
                </span>
              )}
            </div>
          </div>
          <div id="quantity" className="flex w-5/12 justify-end">
            {quantityOptions}
          </div>
        </div>
      </div>
    </div>
  );
}
