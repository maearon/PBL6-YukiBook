import { User, BookOpen, Settings, BarChart3, Award } from "lucide-react"

export function ProfileSidebar({ profile, booksCount }) {
  const menuItems = [
    { icon: User, label: "Thông tin cá nhân", color: "text-blue-600", active: true },
    { icon: BookOpen, label: "Sách đã mua", color: "text-green-600", active: false },
    { icon: BarChart3, label: "Thống kê", color: "text-purple-600", active: false },
    { icon: Settings, label: "Cài đặt", color: "text-gray-600", active: false },
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8 hover:shadow-xl transition-shadow duration-300">
      {/* Profile Avatar Section */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <User size={32} className="text-white" />
        </div>
        <h3 className="font-semibold text-gray-800 text-lg">{profile.fullname}</h3>
        <p className="text-gray-600 text-sm">{profile.email}</p>
        <div className="mt-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Award size={12} className="mr-1" />
            Thành viên VIP
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="space-y-2 mb-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
              item.active
                ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600 shadow-sm"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon size={18} className={`mr-3 ${item.active ? "text-blue-600" : item.color}`} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Statistics Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-medium text-gray-800 mb-4 flex items-center">
          <BarChart3 size={16} className="mr-2 text-purple-600" />
          Thống kê
        </h4>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
            <div className="flex justify-between items-center">
              <span className="text-blue-700 text-sm font-medium">Sách đã mua</span>
              <span className="font-bold text-blue-800 text-lg">{booksCount}</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
            <div className="flex justify-between items-center">
              <span className="text-green-700 text-sm font-medium">Thành viên từ</span>
              <span className="font-bold text-green-800 text-lg">2024</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <div className="flex justify-between items-center">
              <span className="text-purple-700 text-sm font-medium">Điểm tích lũy</span>
              <span className="font-bold text-purple-800 text-lg">1,250</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium">
          Nâng cấp tài khoản
        </button>
      </div>
    </div>
  )
}
