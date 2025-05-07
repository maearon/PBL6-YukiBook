import React from "react";
import { motion } from "framer-motion";

export default function ProductSection({ category, products, onEdit, onDelete }) {
  if (!products.length) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 mb-4">{category.name}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="w-64 h-96 bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between hover:shadow-xl transition-shadow flex-shrink-0"
            whileHover={{ scale: 1.02 }}
          >
            {/* Ảnh hoặc placeholder cho PDF */}
            <div className="h-40 w-full overflow-hidden rounded-md mb-2">
              <img
                src={
                  product.thumbnail ||
                  (product.file_format === "pdf"
                    ? "/pdf-placeholder.png"
                    : product.file_url)
                }
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Thông tin */}
            <div className="flex-1 overflow-hidden">
              <h3 className="text-md font-semibold text-gray-800 mb-1 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-3">
                {product.description}
              </p>
            </div>

            {/* Giá & nút */}
            <div className="mt-3">
              <p className="text-primary font-bold mb-3">
                {product.price.toLocaleString()}₫
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => onEdit(product)}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-100 transition"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="px-3 py-1 text-sm border rounded text-red-600 hover:bg-red-50 transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
