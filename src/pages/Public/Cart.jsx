import React, { useEffect, useState } from "react";
import { fakeBooks } from "../../mocks/fakeBooks";
import { fakeShops } from "../../mocks/fakeShops";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const enriched = cart.map((item) => {
      const book = fakeBooks.find((b) => b.id === item.bookId);
      const shop = fakeShops.find((s) => s.id === book.shopId);
      return { ...item, book, shop };
    });
    setCartItems(enriched);
  }, []);

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    const saveCart = updatedItems.map(({ bookId }) => ({ bookId }));
    localStorage.setItem("cart", JSON.stringify(saveCart));
  };

  const toggleSelect = (bookId) => {
    if (selectedItems.includes(bookId)) {
      setSelectedItems(selectedItems.filter((id) => id !== bookId));
    } else {
      setSelectedItems([...selectedItems, bookId]);
    }
  };

  const deleteSelected = () => {
    const updated = cartItems.filter(
      (item) => !selectedItems.includes(item.bookId)
    );
    updateCart(updated);
    setSelectedItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.book.price, 0);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!cartItems.length) {
    return (
      <div className="p-10 text-center text-gray-500">
        Giỏ hàng của bạn đang trống!
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-20">
      <h2 className="text-2xl font-bold mb-6">🛒 Giỏ hàng của bạn</h2>

      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div
            key={item.bookId}
            className="flex gap-4 bg-white p-4 rounded-lg shadow items-center"
          >
            <input
              type="checkbox"
              checked={selectedItems.includes(item.bookId)}
              onChange={() => toggleSelect(item.bookId)}
              className="w-5 h-5"
            />
            <img
              src={item.book.thumbnail}
              alt={item.book.title}
              className="w-20 h-28 rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.book.title}</h3>
              <p className="text-gray-500 text-sm">{item.shop.name}</p>
            </div>
            <div className="text-primary font-bold">
              {item.book.price.toLocaleString()}₫
            </div>
          </div>
        ))}
      </div>

      {/* Xóa sản phẩm và tổng tiền */}
      <div className="flex justify-between items-center mt-10 flex-wrap gap-4">
        <div className="flex gap-4">
          <button
            onClick={deleteSelected}
            className="btn-primary px-6 py-2 rounded-full"
            disabled={selectedItems.length === 0}
          >
            Xóa sản phẩm đã chọn
          </button>

          {/* Nút Thanh toán */}
          <button
            onClick={handleCheckout}
            className="btn-primary px-6 py-2 rounded-full bg-green-500 hover:bg-green-600"
          >
            Thanh toán
          </button>
        </div>

        <div className="text-xl font-bold">
          Tổng cộng:{" "}
          <span className="text-primary">{getTotal().toLocaleString()}₫</span>
        </div>
      </div>
    </div>
  );
}
