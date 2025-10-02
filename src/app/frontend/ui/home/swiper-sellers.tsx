"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import CardFeaturedSeller from "./card-featured-seller";
import { Seller } from "@/app/frontend/lib/definitions";

export default function SwiperSellers({ sellers }: { sellers: Seller[] }) {
  return (
    <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={true}
      modules={[Autoplay, Pagination]}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      className="w-full h-full"
    >
      {sellers.map((seller) => (
        <SwiperSlide
          className="flex justify-center items-center text-lg"
          key={seller._id}
        >
          <Link
            href={`/seller/${seller.slug}`}
            className="block w-full h-full"
          >
            <CardFeaturedSeller seller={seller} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
