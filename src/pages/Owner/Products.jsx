import React, { useEffect, useState } from "react";
import axios from "axios";
import OwnerSidebar from "../../components/OwnerSidebar";
import { useAuth } from "../../contexts/AuthContext";

export default function Products() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🔑 user từ context:", user);

        if (!user || !user.token || !user.user_id) {
          console.warn("⛔ Thiếu user, token hoặc user_id");
          return;
        }

        const [shopRes, catRes] = await Promise.all([
          axios.get(`http://localhost:8081/api/v1/shops/${user.user_id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          axios.get("http://localhost:8081/api/v1/categories?page=1&limit=10"),
        ]);

        console.log("🏪 Dữ liệu shop:", shopRes.data);
        console.log("📂 Dữ liệu categories:", catRes.data);

        const shopId = shopRes.data.id;

        const prodRes = await axios.get(
          `http://localhost:8081/api/v1/products/shop/${shopId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        console.log("📦 Dữ liệu products:", prodRes.data);

        setCategories(catRes.data);
        setProducts(prodRes.data);
      } catch (err) {
        console.error("🔥 Lỗi khi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getProductsByCategory = (categoryId) =>
    products.filter((p) => p.category_id === categoryId);

  if (loading) return <div className="p-8 text-gray-500">Đang tải dữ liệu...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OwnerSidebar />
      <main className="flex-1 p-8 space-y-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Sản phẩm của tôi</h1>
          <button className="rounded bg-primary text-white px-4 py-2 text-sm font-semibold hover:bg-primary-dark transition">
            + Thêm sản phẩm
          </button>
        </div>

        {categories.map((category) => {
          const items = getProductsByCategory(category.id);
          if (items.length === 0) return null;

          return (
            <section key={category.id}>
              <h2 className="text-xl font-bold text-gray-800 mb-4">{category.name}</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {items.map((product, idx) => (
                  <div
                    key={idx}
                    className="min-w-[250px] bg-white shadow rounded-lg p-4 flex-shrink-0"
                  >
                    <img
                      src={product.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
                      alt={product.name}
                      className="h-40 w-full object-cover rounded-md mb-3"
                    />
                    <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.description}</p>
                    <p className="mt-2 text-primary font-bold">
                      {product.price.toLocaleString()}₫
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
