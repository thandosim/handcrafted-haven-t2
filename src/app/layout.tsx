import "@/app/ui/globals.css";
import Logo from "@/app/ui/header/logo";
import Nav from "./ui/header/menu";
import { Viewport } from "next";

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
      </body>
    </html>
  );
}
