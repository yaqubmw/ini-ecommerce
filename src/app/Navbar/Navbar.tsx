import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import { ShoppingCartButton } from "./ShoppingCartButton";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";
import { UserMenuButton } from "./UserMenuButton";
import { SearchButton, SearchMobile } from "./SearchButton";
import MobileMenuButton from "./MobileMenuButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <div className="navbar flex w-full items-center justify-between bg-white px-1 sm:px-6">
      <div className="order-1 basis-1/3 justify-start sm:order-none sm:hidden sm:basis-0"></div>
      <div className="order-2 basis-1/3 justify-center sm:order-1 sm:justify-start">
        <Link
          href={"/"}
          className="flex items-center gap-2 opacity-100 transition-opacity duration-500 hover:opacity-70"
        >
          <Image
            src={Logo}
            width={36}
            height={36}
            alt="IniEcommerce"
            className="block w-9 sm:w-12"
          />
          <span className="hidden text-lg font-bold sm:block">
            IniEcommerce
          </span>
        </Link>
      </div>
      <div className="order-none hidden sm:order-2 sm:flex sm:justify-center">
        <SearchButton />
      </div>
      <div className="order-3 basis-1/3 justify-end">
        <div className="hidden space-x-3 sm:flex sm:items-center">
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
        <div className="flex items-center sm:hidden">
          <MobileMenuButton cart={cart} session={session} />
        </div>
      </div>
    </div>
  );
}
