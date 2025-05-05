import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BookCard from "./BookCard";

export default function Section2() {
  const [flashDeals, setFlashDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashDeals = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/api/v1/products?page=0&limit=5"
        );
        setFlashDeals(res.data.product);
      } catch (err) {
        console.error("🔥 Lỗi khi tải Flash Deals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFlashDeals();
  }, []);

  if (loading) return <div className="p-8 text-gray-500">Đang tải Flash Deals…</div>;

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
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          modules={[Navigation, Autoplay]}
        >
          {flashDeals.map((book) => (
            <SwiperSlide key={book.id}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
