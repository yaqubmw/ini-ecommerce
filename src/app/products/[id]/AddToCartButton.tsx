"use client";
import { useState, useTransition } from "react";
import { incrementProductQty } from "./actions";

interface AddToCartButtonProps {
  productId: string;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const handleIncrement = async () => {
    setSuccess(false);
    startTransition(async () => {
      await incrementProductQty(productId);
      setSuccess(true);
    });
  };

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row">
      {isPending && <span className="loading loading-ring loading-md" />}
      {!isPending && success && (
        <span className="text-xs text-success">Added to Cart.</span>
      )}
      <button className="btn btn-primary" onClick={handleIncrement}>
        <div className="flex items-center justify-center gap-1">
          <div>Add to Cart</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}
