// RegisterForm.jsx
"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, BookOpen } from "lucide-react"
import { AuthContext } from "../../contexts/AuthContext"

export default function RegisterForm() {
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPwd, setConfirmPwd] = useState("")
  const [showPassword, setShowPassword] = useState(false)           // 🟢 thêm
  const [showConfirmPassword, setShowConfirmPassword] = useState(false) // 🟢 thêm
  const [error, setError] = useState("")
  const [localLoading, setLocalLoading] = useState(false)
  const navigate = useNavigate()
  const { register } = useContext(AuthContext)

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPwd) {
      setError("Mật khẩu không khớp!")
      return
    }

    setLocalLoading(true)
    try {
      await register({
        fullname,
        phone_number: phoneNumber,
        email,
        password,
        retype_password: confirmPwd,
        address: "Da Nang",
        role_id: 3,
        facebook_account_id: 0,
        google_account_id: 0,
        date_of_birth: "1990-01-01",
      })
      navigate("/")
    } catch (err) {
      setError(err.message || "Đăng ký thất bại")
    } finally {
      setLocalLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl border-none">
          {/* Header */}
          <div className="p-6 text-center border-b space-y-1">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-purple-100 p-3">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-purple-700">Đăng ký tài khoản</h2>
            <p className="text-gray-500">Tạo tài khoản để khám phá thế giới sách điện tử</p>
          </div>

          {/* Form */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 rounded-md bg-red-50 text-red-800 border border-red-200">
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium">
                  Họ và tên
                </label>
                <input
                  id="fullname"
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium">
                  Số điện thoại
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Nhập số điện thoại của bạn"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Nhập địa chỉ email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tạo mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 pr-10 border rounded-md focus:ring-purple-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPwd" className="block text-sm font-medium">
                  Nhập lại mật khẩu
                </label>
                <div className="relative">
                  <input
                    id="confirmPwd"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    required
                    className="w-full px-3 py-2 pr-10 border rounded-md focus:ring-purple-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-md bg-purple-600 text-white font-medium disabled:opacity-50"
                disabled={localLoading}
              >
                {localLoading ? "Đang xử lý..." : "Đăng ký"}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="p-6 border-t text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <a href="/login" className="font-medium text-purple-600 hover:text-purple-800">
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
