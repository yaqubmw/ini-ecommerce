import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add Product - IniEcommerce",
  alternates: {
    canonical: "/add-product",
  },
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div className="mx-4 mb-10 flex flex-col items-center justify-center gap-2 md:mx-24">
      <h1 className="my-6 text-lg font-bold">Add Product</h1>
      <form
        action={addProduct}
        className="flex w-full max-w-96 flex-col items-center"
      >
        <input
          required
          name="name"
          placeholder="Name"
          className="input mb-3 w-full shadow"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea mb-3 w-full shadow"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input mb-3 w-full shadow"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input mb-10 w-full shadow"
        />
        <FormSubmitButton className="btn-block max-w-52">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
