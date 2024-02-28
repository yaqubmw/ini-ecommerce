"use client";

import { Session } from "next-auth";
import Image from "next/image";
import ProfpicPlaceholder from "@/assets/user-login-placeholder-2.png";
import { signIn, signOut } from "next-auth/react";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-circle btn-ghost btn-sm hover:bg-secondary-content hover:text-secondary"
      >
        {user ? (
          <Image
            src={user.image || ProfpicPlaceholder}
            alt="Profile picture"
            height={40}
            width={40}
            className="h-6 w-6 rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 rounded-full"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-30 mt-3 w-52 rounded-box bg-teal-100 p-2 shadow md:w-80"
      >
        <li>
          {user ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="btn btn-primary btn-sm outline-none hover:text-primary"
            >
              <div className="inline-flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-ml-1 mr-2 h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign Out
              </div>
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="btn btn-primary btn-sm outline-none hover:text-primary"
            >
              <div className="inline-flex items-center justify-center">
                <svg
                  className="-ml-1 mr-2 h-4 w-4"
                  role="img"
                  viewBox="0 0 488 512"
                  xmlns="http://www.w3.org/2000/svg"
                  data-prefix="fab"
                  data-icon="google"
                >
                  <path
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    fill="currentColor"
                  />
                </svg>
                Sign In with Google
              </div>
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
