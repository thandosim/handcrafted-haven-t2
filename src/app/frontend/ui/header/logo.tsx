import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo-handcrafted.webp"
      width={150}
      height={150}
      alt="HandCrafted Logo"
      className="z-40 p-xsmall"
      // layout="intrinsic"
    />
  );
}
