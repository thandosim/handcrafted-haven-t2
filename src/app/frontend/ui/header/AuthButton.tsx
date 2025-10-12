"use client";

import {
  ArrowRightEndOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function AuthButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/users/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setIsLoggedIn(true);
          setUser(data.user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch {
        setIsLoggedIn(false);
        setUser(null);
      }
    }

    checkAuth();
  }, [pathname]);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }
  return (
    <div className="relative">
      <button type="button" onClick={handleToggle}>
        <UserIcon className="size-6 text-gray-700" />
      </button>
      {isLoggedIn ? (
        <ul
          className={`${
            isOpen
              ? "block absolute z-100 top-8 right-1 w-40 h-auto bg-surface shadow-md rounded-md text-md"
              : "hidden"
          }`}
        >
          <li className="border-b-1 border-gray-300">
            <a
              href="/"
              onClick={handleLogout}
              className=" p-xsmall flex items-center gap-xsmall hover:bg-gray-200"
            >
              <ArrowRightEndOnRectangleIcon className="size-5 text-gray-700" />
              Logout
            </a>
          </li>
          <li>
            <a
              href="/register"
              className=" p-xsmall flex items-center gap-xsmall hover:bg-gray-200"
            >
              <ArrowTopRightOnSquareIcon className="size-5 text-gray-700" />
              Profile
            </a>
          </li>
        </ul>
      ) : (
        <ul
          className={`${
            isOpen
              ? "block absolute z-100 top-8 right-1 w-40 h-auto bg-surface shadow-md rounded-md text-md"
              : "hidden"
          }`}
        >
          <li className="border-b-1 border-gray-300">
            <Link
              href="/login"
              className=" p-xsmall flex items-center gap-xsmall hover:bg-gray-200"
            >
              <ArrowRightEndOnRectangleIcon className="size-5 text-gray-700" />
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className=" p-xsmall flex items-center gap-xsmall hover:bg-gray-200"
            >
              <ArrowTopRightOnSquareIcon className="size-5 text-gray-700" />
              Register
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
