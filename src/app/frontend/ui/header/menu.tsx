"use client";

import Link from "next/link";
import styles from "./header.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton"; 

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
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
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
        md:flex md:flex-row md:relative md:shadow-none md:bg-transparent md:justify-evenly md:w-full md:h-auto`}
      >
        <div className="py-small border-b-2 border-gray-200 md:hidden">
          <Image
            src="/logo-handcrafted.webp"
            width={150}
            height={20}
            alt="Logo of application"
            className="mx-auto"
          />
        </div>

        <ul className="flex flex-col md:flex-row md:flex-wrap md:justify-center">
          {navlinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={clsx(
                  "block p-small text-gray-500 text-center hover:bg-accent2 hover:text-gray-900 border-b-1 border-gray-100 md:border-none md:px-medium",
                  {
                    "bg-accent2 text-gray-900": pathname === link.href,
                  }
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col md:flex-row md:flex-wrap">
          {isLoggedIn ? (
            <li>
              <LogoutButton />
            </li>
          ) : (
            accountlinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={clsx(
                    "block p-small text-gray-500 text-center hover:bg-accent2 hover:text-gray-900 border-b-1 border-gray-100 md:border-none md:px-medium",
                    {
                      "bg-accent2 text-gray-900": pathname === link.href,
                    }
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </nav>
    </>
  );
}
