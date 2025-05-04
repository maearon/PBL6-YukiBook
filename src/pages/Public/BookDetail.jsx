import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fakeBooks } from "../../mocks/fakeBooks";
import { fakeShops } from "../../mocks/fakeShops";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = fakeBooks.find((item) => item.id === Number(id));
  const shop = fakeShops.find((s) => s.id === book?.shopId);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.bookId === book.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ bookId: book.id, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  if (!book) {
    return <div className="p-8 text-center text-red-500">Sách không tồn tại!</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-10 pt-20">
      {/* Ảnh bìa */}
      <div className="flex-1">
        <img src={book.thumbnail} alt={book.title} className="rounded-lg shadow-lg w-full object-cover" />
      </div>

      {/* Thông tin sách */}
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-gray-500 text-lg">Tác giả: {book.author}</p>
        <p className="text-primary text-2xl font-semibold">{book.price.toLocaleString()}₫</p>

        {/* Thêm dòng này để hiển thị số lượng đã bán */}
        <p className="text-green-600 font-medium">Đã bán: {book.sold?.toLocaleString() || 0} bản</p>

        <p className="text-gray-700 leading-relaxed">{book.description}</p>

        <div className="flex items-center gap-4 mt-4">
          <img src={shop.avatarUrl} alt={shop.name} className="w-12 h-12 rounded-full" />
          <p className="font-medium">{shop.name}</p>
        </div>

        <button
          onClick={handleAddToCart}
          className="btn-primary py-3 px-6 rounded-full text-lg font-semibold mt-6 w-max"
        >
          🛒 Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
