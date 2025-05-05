import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OwnerSidebar from "../../components/OwnerSidebar";
import { useAuth } from "../../contexts/AuthContext";
import useProducts from "../../hooks/useProducts";

export default function Products() {
  const { user, isAuthLoading } = useAuth();
  const { products, loading, error, deleteProduct } = useProducts();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/api/v1/categories?page=1&limit=10"
        );
        setCategories(res.data);
      } catch (err) {
        console.error("🔥 Lỗi khi tải categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const getProductsByCategory = (categoryId) =>
    products.filter((p) => p.category_id === categoryId);

  const handleAdd = () => navigate("/products/new");
  const handleEdit = (id) => navigate(`/products/edit/${id}`);
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await deleteProduct(id);
    } catch (err) {
      alert("🔥 Xóa sản phẩm thất bại. Vui lòng thử lại.");
    }
  };

  if (loading || isAuthLoading)
    return <div className="p-8 text-gray-500">Đang tải dữ liệu...</div>;

  if (error)
    return <div className="p-8 text-red-500">Lỗi: {error.message}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OwnerSidebar />
      <main className="flex-1 p-8 space-y-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Sản phẩm của tôi</h1>
          <button
            onClick={handleAdd}
            className="rounded bg-primary text-white px-4 py-2 text-sm font-semibold hover:bg-primary-dark transition"
          >
            + Thêm sản phẩm
          </button>
        </div>

        {categories.map((category) => {
          const items = getProductsByCategory(category.id);
          if (!items.length) return null;

          return (
            <section key={category.id}>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {category.name}
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {items.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-[250px] bg-white shadow rounded-lg p-4 flex-shrink-0"
                  >
                    <img
                      src={
                        product.thumbnail ||
                        product.file_url ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={product.name}
                      className="h-40 w-full object-cover rounded-md mb-3"
                    />

                    <h3 className="text-md font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.description}
                    </p>
                    <p className="mt-2 text-primary font-bold">
                      {product.price.toLocaleString()}₫
                    </p>
                    <div className="mt-3 flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 text-sm border rounded text-red-600 hover:bg-red-50"
                      >
                        Xóa
                      </button>
                    </div>
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
