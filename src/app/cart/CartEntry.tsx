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
    handleQty(newQty);
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
      <div className="flex w-4 justify-center text-xs">{quantity}</div>
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
    <div className="relative w-full">
      <button className="absolute right-4 top-2 z-10" onClick={removeProduct}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 transition-colors duration-500 hover:text-red-600"
        >
          <path
            fillRule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="relative flex w-full flex-col items-center gap-3 md:flex-row">
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
          <div className="flex items-center justify-between gap-2 rounded border px-2 py-4 shadow-md">
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
    </div>
  );
}
