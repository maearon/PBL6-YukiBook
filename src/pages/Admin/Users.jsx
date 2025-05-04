import React from "react";
import AdminSidebar from "../../components/AdminSidebar";

// ⚡ Fake dữ liệu người dùng
const fakeUsers = [
  {
    id: 1,
    fullname: "Nguyễn Văn A",
    email: "a.nguyen@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 2,
    fullname: "Trần Thị B",
    email: "b.tran@example.com",
    role: "Shop Owner",
    status: "Inactive",
  },
  {
    id: 3,
    fullname: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "Active",
  },
];

export default function Users() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar Admin */}
      <AdminSidebar />

      {/* Nội dung chính */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Quản lý người dùng</h1>
          <button className="rounded bg-primary text-white px-4 py-2 text-sm font-semibold hover:bg-primary-dark transition">
            + Thêm người dùng
          </button>
        </div>

        {/* Danh sách người dùng */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto rounded-lg bg-white shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Họ và tên</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Vai trò</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Trạng thái</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {fakeUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-3">{user.fullname}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    {user.status === "Active" ? (
                      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-primary hover:underline text-sm mr-2">Sửa</button>
                    <button className="text-red-500 hover:underline text-sm">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
