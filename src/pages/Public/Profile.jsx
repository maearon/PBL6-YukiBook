import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user, isAuthLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/v1/orders?user_id=${user.user_id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setOrders(res.data || []);
      } catch (err) {
        console.error("🔥 Lỗi khi tải đơn hàng:", err);
      } finally {
        setLoadingOrders(false);
      }
    };
    if (!isAuthLoading) fetchOrders();
  }, [user, isAuthLoading]);

  if (isAuthLoading) return <div className="p-8 text-gray-500">Đang tải...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Tài khoản của tôi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <p><span className="font-semibold">Tên:</span> {user.name || user.email}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
        </div>
        <div className="space-y-2">
          <p><span className="font-semibold">Địa chỉ:</span> {user.address || 'Chưa cập nhật'}</p>
          <p><span className="font-semibold">Số điện thoại:</span> {user.phone || 'Chưa cập nhật'}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Đơn mua hàng</h2>
      {loadingOrders ? (
        <div className="text-gray-500">Đang tải đơn hàng...</div>
      ) : orders.length ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const date = new Date(order.created_at);
            return (
              <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition duration-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Mã đơn: #{order.id}</span>
                  <span className="text-sm text-gray-600">
                    {date.toLocaleString('vi-VN')}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between items-center">
                  <div className="text-sm">
                    <p><span className="font-semibold">Trạng thái:</span> {order.status}</p>
                    <p><span className="font-semibold">Tổng tiền:</span> {order.total.toLocaleString()}₫</p>
                  </div>
                  <button
                    disabled={isRedirecting}
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setIsRedirecting(true);
                      setTimeout(() => {
                        window.location.href = `/orders/${order.id}`;
                      }, 200);
                    }}
                    className={`mt-2 md:mt-0 px-4 py-2 rounded-md text-sm whitespace-nowrap transition duration-200 transform focus:outline-none focus:ring-2
                      ${selectedOrderId === order.id
                        ? "bg-blue-800 text-white ring-2 ring-blue-500"
                        : "bg-blue-600 text-white hover:bg-blue-700"}
                      ${isRedirecting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {isRedirecting && selectedOrderId === order.id ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        Đang mở...
                      </span>
                    ) : (
                      "Xem chi tiết"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-gray-500">Bạn chưa có đơn hàng nào.</div>
      )}
    </div>
  );
}
