"use client";

import Image from "next/image";
// import Swiper core and required modules
import { Navigation, Autoplay, Scrollbar } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

import styles from "./banner.module.css";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <div className="relative h-[100vh] md:h-[85vh] border-b-1 border-gray-200">
      <div className={`${styles.container}`}>
        <div className="md:w-[640px] md:h-auto">
          <h1>
            Handcrafted <br />
            <span className="text-primary">Treasures</span> <br />
            Await
          </h1>
          <p>
            Connect with talented artisans and discover one-of-a-kind pieces
            that tell a story. Every purchase supports independent creators.
          </p>
          <div className="flex flex-row gap-medium justify-center mt-medium">
            <Link href="/shop" className="bg-primary text-white p-2 rounded-sm">
              Shop now
            </Link>

            <Link
              href="/about"
              className="bg-gray-50 p-2 rounded-sm border-1 border-gray-200"
            >
              Learn more
            </Link>
          </div>
        </div>
        <div className="w-full mt-medium md:w-[800px] md:h-auto">
          <Swiper
            modules={[Navigation, Scrollbar, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide>
              <div className="flex justify-center items-center">
                <Image
                  src="/hero/hero-image-small.webp"
                  width={650}
                  height={450}
                  alt="Women working"
                  className="rounded-md"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center ">
                <Image
                  src="/hero/hero-image-small.webp"
                  width={650}
                  height={450}
                  alt="Women working"
                  className="rounded-md"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="p-small md:p-medium md:absolute left-10 bottom-5 z-100 flex gap-medium mb-xsmall ">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold md:text-3xl">10K+</h2>
          <p className="text-sm">products</p>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold md:text-3xl">2K+</h2>
          <p className="text-sm">Artisans</p>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold md:text-3xl">50K+</h2>
          <p className="text-sm">Happy Customers</p>
        </div>
      </div>
    </div>
  );
}
