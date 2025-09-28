import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo-handcrafted.webp"
      width={60}
      height={60}
      alt="Logo of application"
      className="z-40 p-xsmall"
      layout="intrinsic"
    />
  );
}
