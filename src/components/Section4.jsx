import React from "react";
import BookCard from "./BookCard";


export default function Section4({ dealOfTheWeek }) {
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
          {dealOfTheWeek.map((deal) => (
            <BookCard key={deal.id} book={deal} />
          ))}
        </div>
      </div>
    </section>
  );
}
