import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ShopDetail() {
  const { id } = useParams();
  const { user, isAuthLoading } = useAuth();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${user.token}` };
        // Lấy info shop
        const shopRes = await axios.get(
          `http://localhost:8081/api/v1/shops/${id}`,
          { headers }
        );
        setShop(shopRes.data);

        // Lấy products của shop dưới dạng mảng
        const prodRes = await axios.get(
          `http://localhost:8081/api/v1/products/shop/${id}`,
          { headers }
        );
        const prods = prodRes.data || [];
        setProducts(prods);

        // Lấy categories để lọc
        const catRes = await axios.get(
          `http://localhost:8081/api/v1/categories?page=1&limit=100`,
          { headers }
        );
        const allCats = catRes.data || [];
        const usedCats = allCats.filter((c) =>
          prods.some((p) => p.category_id === c.id)
        );
        setCategories(usedCats);
      } catch (err) {
        console.error("🔥 Lỗi khi tải dữ liệu shop:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (!isAuthLoading) fetchData();
  }, [id, user, isAuthLoading]);

  if (loading || isAuthLoading) return <div className="p-8 text-gray-500">Đang tải shop…</div>;
  if (error) return <div className="p-8 text-red-500">Lỗi: {error.message}</div>;
  if (!shop) return <div className="p-8 text-center text-red-500">Shop không tồn tại!</div>;

  const filtered =
    selectedCat === null
      ? products
      : products.filter((p) => p.category_id === selectedCat);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Simple shop header */}
      <div className="h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
        <h1 className="text-3xl font-bold">{shop.name}</h1>
      </div>

      {/* Category filter tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        <button
          className={`px-3 py-1 rounded ${selectedCat === null ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"}`}
          onClick={() => setSelectedCat(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-3 py-1 rounded ${selectedCat === cat.id ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"}`}
            onClick={() => setSelectedCat(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((book) => (
          <Link
            key={book.id}
            to={`/book/${book.id}`}
            className="border rounded p-2 hover:shadow-md transition"
          >
            <img
              src={book.file_url}
              alt={book.name}
              className="h-32 w-full object-cover rounded mb-2"
            />
            <div className="text-sm font-medium truncate">{book.name}</div>
            <div className="text-blue-600 font-bold mt-1">{book.price.toLocaleString()}₫</div>
          </Link>
        ))}
      </div>
    </div>
  );
}