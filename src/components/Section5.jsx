import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BookCard from "./BookCard";

export default function Section5() {
  const [hotDeals, setHotDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotDeals = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/api/v1/products?page=3&limit=5"
        );
        setHotDeals(res.data.product);
      } catch (err) {
        console.error("🔥 Lỗi khi tải Hot Deals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotDeals();
  }, []);

  if (loading) return <div className="p-8 text-gray-500">Đang tải Hot Deals…</div>;

  return (
    <section className="py-20 bg-white" id="hot-deals">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Hot Deals 🚀
          </h2>
          <a href="#products" className="text-primary hover:underline font-medium">
            Xem tất cả
          </a>
        </div>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation
          modules={[Navigation, Autoplay]}
        >
          {hotDeals.map((book) => (
            <SwiperSlide key={book.id}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
