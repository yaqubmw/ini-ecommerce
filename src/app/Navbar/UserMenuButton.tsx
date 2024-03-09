"use client";

import { Session } from "next-auth";
import Image from "next/image";
import ProfpicPlaceholder from "@/assets/user-login-placeholder-2.png";
import { signIn, signOut } from "next-auth/react";

interface UserMenuButtonProps {
  session: Session | null;
}

export function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-circle btn-ghost btn-sm hover:bg-transparent hover:bg-none hover:text-secondary"
      >
        {user ? (
          <Image
            src={user.image || ProfpicPlaceholder}
            alt="Profile picture"
            height={40}
            width={40}
            className="w-10 rounded-full"
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
        className="menu dropdown-content menu-sm z-30 mt-3 w-52 rounded-box bg-slate-50 p-2 shadow md:w-80"
      >
        <li>
          {user ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="font-semibold">Hello, {user.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="btn btn-primary btn-sm btn-block outline-none"
              >
                <div className="inline-flex items-center justify-center">
                  <span className="text-sm font-bold">Sign Out</span>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <button
                onClick={() => signIn()}
                className="btn btn-primary btn-sm btn-block"
              >
                <div className="inline-flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4"
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
                  <span>Sign In with Google</span>
                </div>
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export function UserMenuMobile({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="flex w-full items-center justify-center rounded-md border-2 p-2">
      <div>
        {user ? (
          <div className="flex flex-col items-center justify-between gap-2">
            <Image
              src={user.image || ProfpicPlaceholder}
              alt="Profile picture"
              height={40}
              width={40}
              className="w-10 rounded-full"
            />
            <span className="text-sm font-semibold">{user.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="btn btn-primary btn-md text-white outline-none"
            >
              <div className="inline-flex">
                <span className="text-sm">Sign Out</span>
              </div>
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="btn btn-primary btn-sm block text-white outline-none"
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
      </div>
    </div>
  );
}
