import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo-handcrafted.svg"
      width={250}
      height={30}
      alt="Logo of application"
    />
  );
}
