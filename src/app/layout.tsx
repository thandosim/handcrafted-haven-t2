import "./frontend/ui/globals.css";
import Logo from "./frontend/ui/header/logo";
import Nav from "./frontend/ui/header/menu";
import { Viewport } from "next";
import { Metadata } from "next";

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
        <header className="shadow-sm p-small w-full md:flex md:flex-row md:px-massive md:py-0 md:justify-evenly">
          <Logo />
          <Nav />
        </header>
        {children}
        <footer className="bg-primary text-white p-small flex justify-evenly mt-large">
          <p>
            &copy; Copyright 2025 by{" "}
            <strong>WDD430 - Team02 HANDCRAFTED HAVEN</strong>
          </p>
          <p>All rights reserved</p>
        </footer>
      </body>
    </html>
  );
}
