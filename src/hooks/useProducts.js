// src/hooks/useProducts.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function useProducts() {
  const { user, isAuthLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch danh sách
  const fetchProducts = useCallback(async () => {
    if (!user?.token || isAuthLoading) return;
    setLoading(true);
    try {
      // giả sử backend: /shops/:userId → lấy shopId; rồi /products/shop/:shopId
      const shopRes = await axios.get(
        `http://localhost:8081/api/v1/shops/${user.user_id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      const prodRes = await axios.get(
        `http://localhost:8081/api/v1/products/shop/${shopRes.data.id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setProducts(prodRes.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [user, isAuthLoading]);

  // xóa sản phẩm
  const deleteProduct = useCallback(
    async (id) => {
      try {
        console.log("🧾 Deleting product id:", id);
        console.log("🔑 Token:", user?.token);

        await axios.delete(`http://localhost:8081/api/v1/products/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        // chỉ update state, không reload
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        throw err;
      }
    },
    [user]
  );

  // TODO: bạn có thể thêm updateProduct / createProduct tương tự

  // gọi fetch khi user/token sẵn sàng
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, fetchProducts, deleteProduct };
}
