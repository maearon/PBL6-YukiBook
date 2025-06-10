"use client"

import { User, Mail, Phone, MapPin, Edit } from "lucide-react"

export function ProfileCard({ profile, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <User className="mr-2 text-blue-600" size={24} />
          Thông tin cá nhân
        </h2>
        <button
          onClick={onEdit}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <Edit size={16} className="mr-2" />
          Chỉnh sửa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-600">
            <User size={16} className="mr-2 text-blue-500" />
            Họ và tên
          </label>
          <div className="text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            {profile.fullname || "Chưa cập nhật"}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-600">
            <Mail size={16} className="mr-2 text-green-500" />
            Email
          </label>
          <div className="text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            {profile.email}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-600">
            <Phone size={16} className="mr-2 text-purple-500" />
            Số điện thoại
          </label>
          <div className="text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            {profile.phoneNumber || "Chưa cập nhật"}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-600">
            <MapPin size={16} className="mr-2 text-red-500" />
            Địa chỉ
          </label>
          <div className="text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            {profile.address || "Chưa cập nhật"}
          </div>
        </div>
      </div>
    </div>
  )
}
