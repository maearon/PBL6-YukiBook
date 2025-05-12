import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ShoppingCart } from "lucide-react";

export default function BookCard({ book }) {
  // Format price with thousand separator
  const formattedPrice = book.price.toLocaleString("vi-VN");
  
  return (
    <Link to={`/book/${book.id}`} className="block h-full">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col overflow-hidden group relative">
        {/* Image container with overlay */}
        <div className="relative overflow-hidden">
          <img
            src={book.file_url || "https://via.placeholder.com/400x600?text=No+Image"}
            alt={book.name}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Hover overlay with action buttons */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <button className="bg-white/90 text-indigo-600 rounded-full p-2 mx-2 hover:bg-white transition-colors">
              <BookOpen size={18} />
            </button>
            <button className="bg-indigo-600 text-white rounded-full p-2 mx-2 hover:bg-indigo-700 transition-colors">
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="font-medium text-gray-800 line-clamp-2 mb-1 group-hover:text-indigo-600 transition-colors">
              {book.name}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-1">
              {book.author || "Unknown Author"}
            </p>
          </div>
          
          <div className="mt-3 flex justify-between items-center">
            <p className="text-indigo-600 font-bold">
              {formattedPrice}₫
            </p>
            <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
              eBook
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}