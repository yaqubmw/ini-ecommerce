import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { formatPrice } from "@/lib/format";

export const metadata = {
  title: "Your Cart - IniEcommerce",
  alternates: {
    canonical: "/cart",
  },
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div className="mx-4 mb-12">
      <h1 className="my-6 flex items-center justify-center text-lg font-bold">
        Shopping Cart
      </h1>
      {cart?.items.map((cartItem) => (
        <div
          key={cartItem.id}
          className="flex flex-col items-center justify-center"
        >
          <CartEntry cartItem={cartItem} />
          <div className="divider" />
        </div>
      ))}
      {!cart?.items.length && (
        <p className="flex items-center justify-center font-medium">
          Your cart is empty
        </p>
      )}
      {!cart?.items.length || (
        <div className="flex items-center justify-end gap-3">
          <p className="my-3 font-bold">
            Total: {formatPrice(cart?.subtotal || 2)}
          </p>
          <button className="btn btn-primary">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                clipRule="evenodd"
              />
            </svg>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
