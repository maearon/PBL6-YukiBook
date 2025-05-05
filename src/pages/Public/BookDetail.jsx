import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthLoading } = useAuth();
  const [book, setBook] = useState(null);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/v1/products/${id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setBook(res.data);

        const shopRes = await axios.get(
          `http://localhost:8081/api/v1/shops/${res.data.shop_id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setShop(shopRes.data);
      } catch (err) {
        console.error("🔥 Lỗi khi tải chi tiết sách:", err);
      } finally {
        setLoading(false);
      }
    };
    if (!isAuthLoading) fetchDetail();
  }, [id, user, isAuthLoading]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.bookId === book.id);
    if (existing) existing.quantity++;
    else cart.push({ bookId: book.id, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  if (loading || isAuthLoading)
    return <div className="p-8 text-gray-500">Đang tải chi tiết sách…</div>;
  if (!book)
    return <div className="p-8 text-center text-red-500">Sách không tồn tại!</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-10 pt-20">
      <div className="flex-1">
        <img
          src={
            book.file_url ||
            "https://via.placeholder.com/400x600?text=No+Image"
          }
          alt={book.name}
          className="rounded-lg shadow-lg w-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">{book.name}</h1>
        <p className="text-primary text-2xl font-semibold">
          {book.price.toLocaleString()}₫
        </p>
        <p className="text-gray-700 leading-relaxed">{book.description}</p>

        {shop && (
          <Link to={`/shops/${shop.id}`} className="flex items-center gap-4 mt-4">
            <img
              src={shop.avatarUrl || "https://i.pravatar.cc/100?img=5"}
              alt={shop.name}
              className="w-12 h-12 rounded-full"
            />
            <p className="text-xl font-bold uppercase">{shop.name}</p>
          </Link>
        )}

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
