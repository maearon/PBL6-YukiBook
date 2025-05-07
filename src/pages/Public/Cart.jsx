import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import OwnerSidebar from "../../components/OwnerSidebar";
import { useAuth } from "../../contexts/AuthContext";
import useProducts from "../../hooks/useProducts";
import { createPortal } from "react-dom";

export default function Products() {
  const { user, isAuthLoading } = useAuth();
  const { products, loading, error, deleteProduct } = useProducts();
  const [categories, setCategories] = useState([]);

  // Inline edit state
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    description: "",
    file_url: "",
    categoryId: null,
  });

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

  // Prefill form on edit
  const onEditClick = (prod) => {
    setEditing(prod);
    setForm({
      name: prod.name,
      price: prod.price,
      description: prod.description,
      file_url: prod.file_url,
      categoryId: prod.category_id,
    });
  };

  // Handle field changes
  const handleChange = (field) => (e) => {
    const value = field === "price" ? +e.target.value : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleCategoryChange = (id) => {
    setForm((f) => ({ ...f, categoryId: id }));
  };

  // Submit update
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8081/api/v1/products/${editing.id}`,
        {
          name: form.name,
          price: form.price,
          description: form.description,
          file_url: form.file_url,
          category_id: form.categoryId,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("✅ Cập nhật thành công");
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert("🔥 Cập nhật thất bại");
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
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.05 }}
            className="rounded bg-primary text-white px-4 py-2 text-sm font-semibold hover:bg-primary-dark transition"
          >
            + Thêm sản phẩm
          </motion.button>
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
                  <motion.div
                    key={product.id}
                    className="min-w-[250px] bg-white shadow rounded-lg p-4 flex-shrink-0 hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={product.thumbnail || product.file_url ||
                        "https://via.placeholder.com/300x200?text=No+Image"}
                      alt={product.name}
                      className="h-40 w-full object-cover rounded-md mb-3"
                    />

                    <h3 className="text-md font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      {product.description}
                    </p>
                    <p className="mt-2 text-primary font-bold">
                      {product.price.toLocaleString()}₫
                    </p>
                    <div className="mt-3 flex justify-end space-x-2">
                      <motion.button
                        onClick={() => onEditClick(product)}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 text-sm border rounded hover:bg-gray-100 transition"
                      >
                        Sửa
                      </motion.button>
                      <motion.button
                        onClick={() => deleteProduct(product.id)}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 text-sm border rounded text-red-600 hover:bg-red-50 transition"
                      >
                        Xóa
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}

        <AnimatePresence>
          {editing &&
            createPortal(
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.form
                  onSubmit={handleSave}
                  className="bg-white p-6 rounded-xl shadow-2xl w-96 z-[10000]"
                  initial={{ scale: 0.8, y: -50, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.8, y: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Sửa: {editing.name}</h2>

                  {['name','price','description','file_url'].map((field) => (
                    <label key={field} className="block mb-3">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                      <input
                        type={field === 'price' ? 'number' : 'text'}
                        value={form[field]}
                        onChange={handleChange(field)}
                        className="w-full border px-3 py-2 rounded focus:scale-105 transition-transform duration-200"
                        required={field !== 'description'}
                      />
                    </label>
                  ))}

                  {/* Chọn 1 danh mục bằng radio */}
                  <fieldset className="mb-4">
                    <legend className="font-medium mb-2">Danh mục</legend>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <label key={cat.id} className="inline-flex items-center">
                          <input
                            type="radio"
                            name="category"
                            checked={form.categoryId === cat.id}
                            onChange={() => handleCategoryChange(cat.id)}
                            className="mr-2"
                          />
                          {cat.name}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="flex justify-end space-x-3">
                    <motion.button
                      type="button"
                      onClick={() => setEditing(null)}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                    >
                      Hủy
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Lưu
                    </motion.button>
                  </div>
                </motion.form>
              </motion.div>,
              document.body
            )
          }
        </AnimatePresence>
      </main>
    </div>
  );
}
