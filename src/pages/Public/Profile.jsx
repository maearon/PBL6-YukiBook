"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import CustomerSidebar from "../../components/CustomerSidebar"
import { useAuth } from "../../hooks/useAuth.js"

export default function Profile() {
  const { user, isAuthLoading } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [purchasedBooks, setPurchasedBooks] = useState([
    { id: 1, name: "Ebook Lập Trình Python", fileUrl: "https://example.com/ebook1.pdf" },
    { id: 2, name: "Ebook React.js Nâng Cao", fileUrl: "https://example.com/ebook2.pdf" },
    { id: 3, name: "Ebook JavaScript Cơ Bản", fileUrl: "https://example.com/ebook3.pdf" }
  ]);

  useEffect(() => {
    if (isAuthLoading || !user?.user_id) return
    ;(async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/v1/users/${user.user_id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        setProfile(res.data)
      } catch (err) {
        console.error("🔥 Lỗi khi tải hồ sơ:", err)
      } finally {
        setLoading(false)
      }
    })()
  }, [user, isAuthLoading])

  if (isAuthLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Đang tải hồ sơ…</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <CustomerSidebar />

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">Hồ sơ cá nhân</h1>

        <div className="rounded-lg bg-white p-6 shadow space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Họ và tên</label>
            <p className="mt-1 text-gray-800">{profile.fullname || "Chưa cập nhật"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <p className="mt-1 text-gray-800">{profile.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Số điện thoại</label>
            <p className="mt-1 text-gray-800">{profile.phoneNumber || "Chưa cập nhật"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Địa chỉ</label>
            <p className="mt-1 text-gray-800">{profile.address || "Chưa cập nhật"}</p>
          </div>
        </div>

        {/* Purchased Books Section */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">Sách đã mua</h2>
          {purchasedBooks.map((book) => (
            <div key={book.id} className="flex justify-between items-center">
              <p className="text-gray-800">{book.name}</p>
              <a
                href={book.fileUrl}
                download
                className="text-blue-600 hover:underline"
              >
                Tải về
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
