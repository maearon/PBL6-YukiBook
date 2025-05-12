// Checkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

export default function Checkout() {
  const { user, isAuthLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!user || !user.token) {
      navigate("/login");
      return;
    }

    // Lấy tổng số tiền từ state được truyền từ Cart
    const amount = location.state?.totalAmount || 0;
    if (amount > 0) {
      setTotalAmount(amount);
    } else {
      // Nếu không có số tiền, quay lại trang giỏ hàng
      alert("Giỏ hàng trống, vui lòng thêm sản phẩm.");
      navigate("/cart");
    }
  }, [location, navigate, user]);

  const handleConfirm = async () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    setIsProcessing(true);

    try {
      // 🔥 Bước 1: Lưu đơn hàng vào hệ thống
      const orderData = {
        user_id: user.user_id,
        fullname: "Nguyễn Văn A",
        email: "vana@example.com",
        phone_number: "0909999991",
        notes: "Giao ebook nhanh",
        status: "pending",
        total_money: totalAmount,
        payment_method: "momo",
        active: true,
      };

      await axios.post("http://localhost:8081/api/v1/orders", orderData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // 🔥 Bước 2: Thanh toán qua MoMo nếu chọn
      if (paymentMethod === "momo") {
        const response = await axios.get(
          `http://localhost:8081/api/v1/payments/create-payment?amount=${totalAmount}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        // Nếu gọi API thành công, chuyển hướng đến trang thanh toán
        if (response.data && response.data.includes("http")) {
          window.location.href = response.data; // Redirect to payment link
        } else {
          alert("Đã xảy ra lỗi khi tạo thanh toán MoMo!");
        }
      } else {
        // Chuyển hướng đến trang xác nhận thành công
        navigate("/checkout/success");
      }
    } catch (error) {
      console.error("🔥 Lỗi khi xác nhận thanh toán:", error);
      alert("Đã xảy ra lỗi khi xác nhận thanh toán!");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isAuthLoading) return <div>Đang tải thông tin...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h2 className="text-2xl font-bold mb-6">Chọn phương thức thanh toán</h2>

      <div className="flex flex-col gap-6">
        {[
          {
            key: "bank",
            title: "🏦 Chuyển khoản Ngân hàng",
            description: "Vietcombank - Số tài khoản: 0123456789 - Chủ TK: Nguyễn Văn A",
          },
          {
            key: "momo",
            title: "📱 Thanh toán qua MoMo",
            description: "Số điện thoại: 0912345678 - Nguyễn Văn A",
          },
        ].map((method) => (
          <div
            key={method.key}
            onClick={() => setPaymentMethod(method.key)}
            className={`relative p-6 border rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
              ${paymentMethod === method.key ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-300"}`}
          >
            <h3 className="text-lg font-semibold">{method.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{method.description}</p>

            {paymentMethod === method.key && (
              <span className="absolute top-2 right-2 text-green-600 text-xl">✔</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-xl font-semibold">
        Tổng số tiền: {totalAmount.toLocaleString()}₫
      </div>

      <button
        onClick={handleConfirm}
        disabled={isProcessing}
        className="btn-primary mt-10 w-full py-3 rounded-full text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        {isProcessing ? "Đang xử lý..." : "Xác nhận thanh toán"}
      </button>
    </div>
  );
}
