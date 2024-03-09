import { ShoppingCart } from "@/lib/db/cart";
import { SearchMobile } from "./SearchButton";
import { ShoppingCartMobile } from "./ShoppingCartButton";
import { Session } from "next-auth";
import { UserMenuMobile } from "./UserMenuButton";

interface MobileMenuButtonProps {
  cart: ShoppingCart | null;
  session: Session | null;
}

export default function MobileMenuButton({
  cart,
  session,
}: MobileMenuButtonProps) {
  return (
    <div className="">
      <label
        htmlFor="mobile_menu"
        className="btn btn-circle btn-ghost text-primary hover:bg-transparent hover:bg-none hover:text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <input type="checkbox" id="mobile_menu" className="modal-toggle" />
      <div className="modal modal-middle" role="dialog">
        <div className="relative flex flex-col items-center justify-end gap-y-3 rounded bg-white px-2 pb-4 pt-12">
          <label
            htmlFor="mobile_menu"
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <SearchMobile />
          <ShoppingCartMobile cart={cart} />
          <UserMenuMobile session={session} />
        </div>
        <label
          className="modal-backdrop absolute h-full w-full"
          htmlFor="mobile_menu"
        ></label>
      </div>
    </div>
  );
}
