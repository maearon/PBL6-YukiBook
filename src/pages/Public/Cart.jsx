import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { user, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch detailed cart items from API
  useEffect(() => {
    const fetchCartItems = async () => {
      const rawCart = JSON.parse(localStorage.getItem("cart")) || [];
      const detailed = [];

      for (const { bookId, quantity } of rawCart) {
        try {
          const bookRes = await axios.get(
            `http://localhost:8081/api/v1/products/${bookId}`,
            { headers: { Authorization: `Bearer ${user.token}` } }
          );
          const book = bookRes.data;

          const shopRes = await axios.get(
            `http://localhost:8081/api/v1/shops/${book.shop_id}`,
            { headers: { Authorization: `Bearer ${user.token}` } }
          );
          const shop = shopRes.data;

          detailed.push({ bookId, quantity, book, shop });
        } catch (err) {
          console.error(`🔥 Lỗi fetch cart item ${bookId}:`, err);
        }
      }

      setCartItems(detailed);
      setLoading(false);
    };

    if (!isAuthLoading) fetchCartItems();
  }, [isAuthLoading, user]);

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    const saveCart = updatedItems.map(({ bookId, quantity }) => ({ bookId, quantity }));
    localStorage.setItem("cart", JSON.stringify(saveCart));
  };

  const toggleSelect = (bookId) => {
    setSelectedItems((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const deleteSelected = () => {
    const updated = cartItems.filter((item) => !selectedItems.includes(item.bookId));
    updateCart(updated);
    setSelectedItems([]);
  };

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + (item.book.price || 0) * item.quantity, 0);

  const handleCheckout = () => navigate("/checkout");

  if (loading || isAuthLoading) {
    return <div className="p-8 text-gray-500">Đang tải giỏ hàng…</div>;
  }

  if (!cartItems.length) {
    return (
      <div className="p-10 text-center text-gray-500">Giỏ hàng của bạn đang trống!</div>
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
              src={
                item.book.thumbnail ||
                "https://via.placeholder.com/80x112?text=No+Image"
              }
              alt={item.book.name}
              className="w-20 h-28 rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.book.name}</h3>
              <p className="text-gray-500 text-sm">{item.shop.name}</p>
              <p className="text-sm">Số lượng: {item.quantity}</p>
            </div>
            <div className="text-primary font-bold">
              {(item.book.price * item.quantity).toLocaleString()}₫
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-10 flex-wrap gap-4">
        <div className="flex gap-4">
          <button
            onClick={deleteSelected}
            className="btn-primary px-6 py-2 rounded-full"
            disabled={selectedItems.length === 0}
          >
            Xóa sản phẩm đã chọn
          </button>
          <button
            onClick={handleCheckout}
            className="btn-primary px-6 py-2 rounded-full bg-green-500 hover:bg-green-600"
          >
            Thanh toán
          </button>
        </div>

        <div className="text-xl font-bold">
          Tổng cộng: <span className="text-primary">{getTotal().toLocaleString()}₫</span>
        </div>
      </div>
    </div>
  );
}