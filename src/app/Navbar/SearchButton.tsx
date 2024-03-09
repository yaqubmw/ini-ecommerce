import { redirect } from "next/navigation";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export function SearchButton() {
  return (
    <form action={searchProducts} className="mx-2">
      <label className="input input-sm input-bordered input-ghost flex w-full min-w-[100px] items-center gap-2 bg-transparent bg-none">
        <input
          name="searchQuery"
          placeholder="Search..."
          className="grow bg-transparent"
          type="text"
        />
        <button className="btn btn-circle btn-ghost btn-sm hover:bg-transparent hover:shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </label>
    </form>
  );
}

export function SearchMobile() {
  return (
    <form action={searchProducts} className="z-50">
      <label className="input input-md input-bordered flex w-full min-w-[100px] items-center gap-2">
        <input
          name="searchQuery"
          placeholder="Search..."
          className="grow"
          type="text"
        />
        <button className="btn btn-circle btn-ghost btn-sm hover:bg-transparent hover:shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </label>
    </form>
  );
}
