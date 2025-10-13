"use client";

import { useAuth } from "@/app/context/AuthContext";
import {
  ArrowRightEndOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import css from "./badge.module.css";
import { useCart } from "@/app/context/CartContext";

export default function AuthButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { cart } = useCart();

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
    <div className="relative flex justify-end mt-small gap-small">
      <div>
        <Link href="/cart" className="relative inline-block">
          <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {cart.reduce((sum, item) => sum + item.qty, 0)}
          </span>
        </Link>
      </div>
      <div>
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
    </div>
  );
}
