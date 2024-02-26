"use client";

import { ShoppingChart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

interface ShoppingCartButtonProps {
  cart: ShoppingChart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
  function closeDropdown() {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <span className="badge indicator-item badge-secondary badge-sm">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="card dropdown-content z-30 mt-3 w-52 bg-base-100 shadow md:w-80"
      >
        <div className="card-body">
          <span className="text-base font-bold">{cart?.size || 0} Items</span>
          <span className="text-sm text-info pb-2">
            Subtotal: {formatPrice(cart?.subtotal || 0)}
          </span>
          <div className="card-actions">
            <Link
              href="/cart"
              className="btn btn-primary btn-block"
              onClick={closeDropdown}
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
