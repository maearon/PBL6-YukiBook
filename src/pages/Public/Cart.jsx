// Cart.jsx

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

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + (item.book.price || 0) * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống, vui lòng thêm sản phẩm.");
      return;
    }

    const totalAmount = getTotal();
    navigate("/checkout", { state: { totalAmount } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-20">
      <h2 className="text-2xl font-bold mb-6">🛒 Giỏ hàng của bạn</h2>
      {/* Hiển thị các sản phẩm */}
      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div key={item.bookId} className="flex gap-4 bg-white p-4 rounded-lg shadow items-center">
            <img
              src={item.book.thumbnail || "https://via.placeholder.com/80x112?text=No+Image"}
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

      {/* Tổng tiền và nút thanh toán */}
      <div className="flex justify-between items-center mt-10">
        <div className="text-xl font-bold">
          Tổng cộng: <span className="text-primary">{getTotal().toLocaleString()}₫</span>
        </div>
        <button
          onClick={handleCheckout}
          className="btn-primary px-6 py-2 rounded-full bg-green-500 hover:bg-green-600"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
