"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import CardFeaturedSeller from "./card-featured-seller";
<<<<<<< HEAD
import { Seller } from "../../lib/definitions";
=======
import { Seller } from "@/app/frontend/lib/definitions";
>>>>>>> f5cc881f8cf6969c159c33f887e459889cb25a60

export default function SwiperSellers({ sellers }: { sellers: Seller[] }) {
  return (
    <>
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
        {sellers.map((seller) => {
          return (
            <>
              <SwiperSlide
                className="flex justify-center items-center text-lg"
                key={seller._id}
              >
                <CardFeaturedSeller seller={seller} />
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </>
  );
}
