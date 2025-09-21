import { lusitana } from "@/app/ui/fonts";

export default function HeroBanner() {
  return (
    <div className="relative h-[600px] overflow-hidden">
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet="/hero/hero-image-large.webp 1x, /hero/hero-image-large@2x.webp 2x"
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/hero/hero-image-medium.webp 1x, /hero/hero-image-medium@2x.webp 2x"
          type="image/webp"
        />
        <img
          src="/hero/hero-image-small.webp"
          srcSet="/hero/hero-image-small.webp 1x, /hero/hero-image-small@2x.webp 2x"
          alt="Handcrafted Image"
          width="760"
          height="426"
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
      </picture>
      <div className="absolute top-0 left-0 bg-gray-900 opacity-50 w-full h-full"></div>
      <h1
        className="absolute bottom-40 text-2xl p-medium text-center font-family-lusitana text-white 
        md:pl-massive md:bottom-20 md:text-4xl font-bold"
      >
        Marketplace for artisans and crafters
      </h1>
    </div>
  );
}
