import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link to={`/book/${book.id}`} className="block group">
      <div className="bg-white rounded-lg shadow hover:shadow-md transition p-4">
        <img
          src={book.thumbnail}
          alt={book.title}
          className="rounded-md h-64 w-full object-cover mb-4 group-hover:scale-105 transition"
        />
        <h3 className="font-semibold text-lg text-gray-800">{book.title}</h3>
        <p className="text-primary font-bold text-xl mt-2">
          {book.price.toLocaleString()}₫
        </p>
      </div>
    </Link>
  );
}