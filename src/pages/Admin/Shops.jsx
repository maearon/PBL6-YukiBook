import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export default function Shops() {
  const { user } = useAuth();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const limit = 20;

  // Modal state for adding shop
  const [showAddModal, setShowAddModal] = useState(false);
  const [newShop, setNewShop] = useState({ name: "", description: "", user_id: "", is_active: true });

  const getAuthHeader = () => ({ headers: { Authorization: `Bearer ${user?.accessToken || user?.token}` } });

  // Fetch shops
  const fetchShops = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8081/api/v1/shops?page=${page}&limit=${limit}`,
        getAuthHeader()
      );
      setShops(res.data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, [page]);

  // CRUD handlers
  const handleAddShop = async (shopData) => {
    try {
      await axios.post("http://localhost:8081/api/v1/shops", shopData, getAuthHeader());
      fetchShops();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditShop = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:8081/api/v1/shops/${id}`, updatedData, getAuthHeader());
      fetchShops();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteShop = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/v1/shops/${id}`, getAuthHeader());
      fetchShops();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* Header with Add button */}
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý cửa hàng</h1>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center rounded bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition"
          >
            + Thêm mới
          </button>
        </div>

        {/* Add Shop Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-96 p-6">
              <h2 className="text-lg font-semibold mb-4">Thêm cửa hàng mới</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium">Tên cửa hàng</label>
                  <input
                    type="text"
                    value={newShop.name}
                    onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
                    className="mt-1 w-full border rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Mô tả</label>
                  <textarea
                    value={newShop.description}
                    onChange={(e) => setNewShop({ ...newShop, description: e.target.value })}
                    className="mt-1 w-full border rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">User ID</label>
                  <input
                    type="number"
                    value={newShop.user_id}
                    onChange={(e) => setNewShop({ ...newShop, user_id: e.target.value })}
                    className="mt-1 w-full border rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newShop.is_active}
                    onChange={(e) => setNewShop({ ...newShop, is_active: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm">Active</span>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewShop({ name: "", description: "", user_id: "", is_active: true });
                  }}
                  className="px-4 py-2 rounded border"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleAddShop(newShop);
                    setShowAddModal(false);
                    setNewShop({ name: "", description: "", user_id: "", is_active: true });
                  }}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shops Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto rounded-lg bg-white shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Tên cửa hàng</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">User ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Trạng thái</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {shops.map((shop) => (
                <tr key={shop.id} className="border-t">
                  <td className="px-4 py-3">{shop.name}</td>
                  <td className="px-4 py-3">{shop.user_id}</td>
                  <td className="px-4 py-3">
                    {shop.is_active ? (
                      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">Active</span>
                    ) : (
                      <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">Inactive</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleEditShop(shop.id, { /* updatedData */ })}
                      className="text-blue-600 hover:underline text-sm mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteShop(shop.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            className="px-3 py-1 rounded border"
          >Previous</button>
          <span className="px-3 py-1">Page {page + 1}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded border"
          >Next</button>
        </div>
      </main>
    </div>
  );
}
