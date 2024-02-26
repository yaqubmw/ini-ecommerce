import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const cart = await getCart();

  return (
    <div className="flex w-full items-center bg-base-100">
      <div className="navbar flex-col items-center gap-2 sm:flex-row">
        <div className="flex-1">
          <Link
            href={"/"}
            className="flex items-center gap-2 opacity-100 transition-opacity duration-500 hover:opacity-70"
          >
            <Image src={Logo} width={36} height={36} alt="IniEcommerce" />
            <span className="text-lg font-bold">IniEcommerce</span>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input input-sm w-full min-w-[100px]"
                type="text"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
        </div>
      </div>
    </div>
  );
}
