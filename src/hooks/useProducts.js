import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function useProducts() {
  const { user, isAuthLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // Fetch all products for this shop
  const fetchProducts = useCallback(async () => {
    if (!user?.token || isAuthLoading) return;
    setLoading(true);
    try {
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

  // Delete a product
  const deleteProduct = useCallback(
    async (id) => {
      await axios.delete(`http://localhost:8081/api/v1/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    },
    [user]
  );

  // Update a product in-place
  const updateProduct = useCallback(
    async (id, updates) => {
      await axios.put(
        `http://localhost:8081/api/v1/products/${id}`,
        updates,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
    },
    [user]
  );

  // Create a new product
  const createProduct = useCallback(
    async (newProd) => {
      const { data } = await axios.post(
        `http://localhost:8081/api/v1/products`,
        newProd,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setProducts((prev) => [...prev, data]);
      return data;
    },
    [user]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    deleteProduct,
    updateProduct,
    createProduct,
  };
}
