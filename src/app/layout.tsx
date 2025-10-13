import "./frontend/ui/globals.css";
import Logo from "./frontend/ui/header/logo";
import Nav from "./frontend/ui/header/menu";
import { Viewport } from "next";
import { Metadata } from "next";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import AuthButton from "./frontend/ui/header/AuthButton";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description:
    "Handcrafted Haven a marketplace for artisans and crafters | Home page",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {/*============ header ==================*/}
            <header className="relative shadow-sm p-xsmall w-full md:py-xsmall md:px-large md:grid md:grid-cols-[250px_1fr_60px] md:items-center md:justify-between md:gap-small">
              <Logo />
              <Nav />
              <AuthButton />
            </header>
            {/*============ main ==================*/}
            {children}
            {/*============ footer ==================*/}
            <footer className="px-medium md:px-massive bg-white py-massive">
              <div className="flex flex-col md:flex-row justify-evently gap-small">
                <div className="flex flex-col justify-evenly w-full md:w-100 md:mr-massive">
                  <Image
                    src="/logo-handcrafted.svg"
                    width={200}
                    height={30}
                    alt="Logo of application"
                  />
                  <p className="text-sm">
                    Discover unique, handcrafted treasures from talented
                    artisans around the world. Every piece tells a story of
                    craftsmanship and creativity.
                  </p>
                  <p className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                       
                      />
                    </svg>

                    <svg
                      className="w-6 h-6 text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                        
                      />
                    </svg>

                    <svg
                      className="w-[18px] h-[18px] text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                    </svg>
                  </p>
                </div>
                <div className=" w-full md:w-100">
                  <h4 className="font-bold text-lg">Quick Links</h4>
                  <ul className="text-sm">
                    <li>
                      <a href="#">Browse Products</a>
                    </li>
                    <li>
                      <a href="#">Categories</a>
                    </li>
                    <li>
                      <a href="#">Featured Sellers</a>
                    </li>
                    <li>
                      <a href="#">New Arrivals</a>
                    </li>
                    <li>
                      <a href="#">Sale Items</a>
                    </li>
                  </ul>
                </div>
                <div className="w-100">
                  <h4 className="font-bold text-lg">Customer Service</h4>
                  <ul className="text-sm">
                    <li>
                      <a href="#">Help Center</a>
                    </li>
                    <li>
                      <a href="#">Shipping Info</a>
                    </li>
                    <li>
                      <a href="#">Returns & Exchanges</a>
                    </li>
                    <li>
                      <a href="#">Size Guide</a>
                    </li>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-100">
                  <h4 className="font-bold text-lg">Stay Connected</h4>
                  <ul className="text-sm">
                    <li className="flex gap-small">
                      <EnvelopeIcon className="w-4 h-4" />{" "}
                      hello@handcraftedhaven.com
                    </li>
                    <li className="flex gap-small">
                      <PhoneIcon className="w-4 h-4" /> 1-800-CRAFTED
                    </li>
                    <li className="flex gap-small">
                      <MapPinIcon className="w-4 h-4" />
                      Ontario Canada
                    </li>
                  </ul>

                  <p className="my-medium">Subscribe to our newsletter</p>
                  <div className="flex gap-small">
                    <input
                      type="text"
                      placeholder="Your email"
                      className="border-1 border-border rounded-md bg-surface p-1 text-sm"
                    />
                    <button className="py-1 px-xsmall bg-primary text-white rounded-md">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between border-t-1 border-gray-200 mt-medium pt-medium">
                <p>
                  &copy; Copyright 2025 by{" "}
                  <strong>WDD430 - Team02 HANDCRAFTED HAVEN</strong>
                </p>
                <p>All rights reserved</p>
              </div>
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
