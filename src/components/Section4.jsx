import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";

export default function Section4() {
  const [dealOfTheWeek, setDealOfTheWeek] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDealOfWeek = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/api/v1/products?page=2&limit=5"
        );
        setDealOfTheWeek(res.data.product);
      } catch (err) {
        console.error("🔥 Lỗi khi tải Deal of the Week:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDealOfWeek();
  }, []);

  if (loading) return <div className="p-8 text-gray-500">Đang tải Deal of the Week…</div>;

  return (
    <section className="py-20 bg-gray-50" id="deal-of-week">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Deal of the Week 🎯
          </h2>
          <a href="#products" className="text-primary hover:underline font-medium">
            Xem tất cả
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {dealOfTheWeek.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
