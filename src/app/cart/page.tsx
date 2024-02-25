import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { formatPrice } from "@/lib/format";

export const metadata = {
  title: "Your Cart - IniEcommerce",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div className="mx-4 mb-12">
      <h1 className="my-6 flex items-center justify-center text-lg font-bold">
        Shopping Cart
      </h1>
      {cart?.items.map((cartItem) => (
        <div className="flex flex-col items-center justify-center">
          <CartEntry cartItem={cartItem} key={cartItem.id} />
          <div className="divider" />
          <div className="flex items-center justify-center gap-3">
            <p className="my-3 font-bold">
              Total: {formatPrice(cart?.subtotal || 0)}
            </p>
            <button className="btn btn-primary">Checkout</button>
          </div>
        </div>
      ))}
      {!cart?.items.length && (
        <p className="flex items-center justify-center font-medium">
          Your cart is empty
        </p>
      )}
    </div>
  );
}
