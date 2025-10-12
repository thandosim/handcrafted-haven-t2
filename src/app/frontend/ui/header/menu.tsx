"use client";

import Link from "next/link";
import styles from "./header.module.css";
import { useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import css from "./badge.module.css";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";

const navlinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Sellers", href: "/sellers" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Menu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  // Helper function to check if link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };
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
        } absolute top-0 left-0 bg-gray-50 shadow-md z-50 w-[250px] h-screen hidden md:flex md:flex-row md:gap-small md:relative md:shadow-none md:bg-transparent md:justify-evently md:items-center md:w-full md:h-auto`}
      >
        <div className="py-small border-b-2 border-gray-200 md:hidden">
          <Image
            src="/logo-handcrafted.svg"
            width={200}
            height={20}
            alt="Logo of application"
            className="mx-auto"
          />
        </div>
        <ul className="flex flex-col md:flex-row md:flex-wrap md:justify-start md:items-center md:flex-2">
          {navlinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={clsx(
                  "block p-small font-family-inter text-gray-400 text-center border-b-1 border-gray-200 md:border-0 hover:text-primary hover:font-bold transition-colors",
                  {
                    "text-primary font-bold": pathname === link.href,
                  }
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:block md:flex-1">
          <input
            type="text"
            placeholder="Search for handcrafted item......"
            className="rounded-md w-full h-[30px] border-2 border-gray-200 bg-gray-100 focus:outline-none p-xsmall"
          />
        </div>
      </nav>
    </>
  );
}
