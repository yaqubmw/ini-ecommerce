import Link from "next/link";

interface PaginationBarProps {
  currentPage: number;
  totalPage: number;
}

export default function PaginationBar({
  currentPage,
  totalPage,
}: PaginationBarProps) {
  const maxPage = Math.min(totalPage, Math.max(currentPage + 2, 5));
  const minPage = Math.max(1, Math.min(currentPage - 2, maxPage - 2));

  const numberedPageItems: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={"?page=" + page}
        key={page}
        className={`btn join-item btn-sm border-none text-xs leading-tight shadow-none hover:bg-white ${currentPage === page ? "btn-active pointer-events-none bg-white" : "bg-slate-100"}`}
      >
        {page}
      </Link>,
    );
  }

  return (
    <div className="join">
      {currentPage >= 1 && (
        <Link
          href={"?page=" + (currentPage - 1)}
          className={`border-none shadow-none btn join-item btn-sm bg-slate-100 hover:bg-white leading-tight ${currentPage === 1 ? "disabled pointer-events-none" : ""}`}
        >
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
      )}
      <div className="hidden sm:block">{numberedPageItems}</div>
      <button className="border-none shadow-none btn join-item btn-active btn-sm pointer-events-none block bg-white hover:bg-white text-xs leading-tight sm:hidden">
        Page {currentPage}
      </button>
      {currentPage <= totalPage && (
        <Link
          href={"?page=" + (currentPage + 1)}
          className={`border-none shadow-none btn join-item btn-sm bg-slate-100 hover:bg-white leading-tight ${currentPage === totalPage ? "disabled pointer-events-none" : ""}`}
        >
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
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
