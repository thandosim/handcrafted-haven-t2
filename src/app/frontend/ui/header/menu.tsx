"use client";

import Link from "next/link";
import styles from "./header.module.css";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import css from "./badge.module.css";
import { useRouter } from "next/router";

const navlinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Sellers", href: "/sellers" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const accountlinks = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

export default function Menu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

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

  return (
    <>
      <Link
        href="#"
        className={`${styles.menu} ${isOpen ? styles.open : ""} md:hidden`}
        aria-label="Menu"
        onClick={handleToggle}
      ></Link>
      <nav
        className={`${
          isOpen ? styles.open : ""
        } absolute top-0 left-0 bg-gray-50 shadow-md z-50 w-[250px] h-screen hidden 
        md:flex md:flex-row md:gap-small md:relative md:shadow-none md:bg-transparent md:justify-evently md:items-center md:w-full md:h-auto`}
      >
        <ul className="flex flex-col md:flex-row md:flex-wrap md:justify-start md:items-center md:flex-2">
          {navlinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={clsx(
                  "block p-small font-family-inter text-primary text-center hover:text-accent1",
                  {
                    "text-accent1": pathname === link.href,
                  }
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/*  {(!isLoggedIn || user?.role === "buyer") && (
            <li className="relative">
              <Link
                href="/cart"
                className={clsx(
                  "block p-small text-gray-500 text-center hover:bg-accent2 hover:text-gray-900 border-b-1 border-gray-100 md:border-none md:px-medium"
                )}
              >
                <span className="sr-only">Cart</span>
                {user?.cart?.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {user.cart.length}
                  </span>
                )}
              </Link>
            </li>
          )} */}
        </ul>

        <div className="md:flex-1">
          <input
            type="text"
            placeholder="Search for handcrafted item......"
            className="rounded-md w-full h-[30px] border-2 border-gray-200 bg-gray-100 focus:outline-none p-xsmall"
          />
        </div>

        <button type="button" className="relative">
          <ShoppingCartIcon className="size-6 text-gray-700" />
          <span className={css.badge}>0</span>
        </button>
      </nav>
    </>
  );
}
