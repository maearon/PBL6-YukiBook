import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BookCard from "./BookCard";



export default function Section2({ flashDeals }) {
  return (
    <section className="py-20 bg-gray-50" id="flash-deals">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Flash Deals 🔥
          </h2>
          <a href="#products" className="text-primary hover:underline font-medium">
            Xem tất cả
          </a>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          modules={[Navigation, Autoplay]}
        >
          {flashDeals.map((item) => (
            <SwiperSlide key={item.id}>
              <BookCard book={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}