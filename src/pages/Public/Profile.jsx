// Profile.jsx
"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import CustomerSidebar from "../../components/CustomerSidebar"
import { useAuth } from "../../hooks/useAuth.js"

export default function Profile() {
  const { user, isAuthLoading } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

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
            <p className="mt-1 text-gray-800">
              {profile.fullname || "Chưa cập nhật"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <p className="mt-1 text-gray-800">{profile.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Số điện thoại</label>
            <p className="mt-1 text-gray-800">
              {profile.phoneNumber || "Chưa cập nhật"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Địa chỉ</label>
            <p className="mt-1 text-gray-800">
              {profile.address || "Chưa cập nhật"}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
