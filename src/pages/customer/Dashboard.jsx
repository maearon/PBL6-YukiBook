import React from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import { useAuth } from "../../hooks/useAuth";

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar bên trái */}
      <CustomerSidebar />

      {/* Nội dung chính */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">Hồ sơ cá nhân</h1>

        <div className="rounded-lg bg-white p-6 shadow space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Họ và tên</label>
            <p className="mt-1 text-gray-800">{user?.fullname || "Chưa cập nhật"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <p className="mt-1 text-gray-800">{user?.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Số điện thoại</label>
            <p className="mt-1 text-gray-800">{user?.phone_number || "Chưa cập nhật"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Địa chỉ</label>
            <p className="mt-1 text-gray-800">{user?.address || "Chưa cập nhật"}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
