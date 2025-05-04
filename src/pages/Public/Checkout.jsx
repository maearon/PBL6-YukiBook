import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    if (paymentMethod === "momo") {
      try {
        const response = await axios.post("http://localhost:4000/api/momo-payment", {
          amount: 100000,
          orderId: `ORDER-${Date.now()}`,
          orderInfo: "Thanh toán đơn hàng sách",
        });

        window.location.href = response.data.payUrl;
      } catch (error) {
        console.error(error);
        alert("Đã xảy ra lỗi khi tạo thanh toán MoMo!");
      }
    } else {
      navigate("/checkout/success");
    }
  };

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
            title: "📱 Thanh toán qua Momo",
            description: "Số điện thoại: 0912345678 - Nguyễn Văn A",
          },
        ].map((method) => (
          <div
            key={method.key}
            onClick={() => setPaymentMethod(method.key)}
            className={`relative p-6 border rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
              ${paymentMethod === method.key ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-300"}
            `}
          >
            <h3 className="text-lg font-semibold">{method.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{method.description}</p>

            {paymentMethod === method.key && (
              <span className="absolute top-2 right-2 text-green-600 text-xl">✔</span>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleConfirm}
        className="btn-primary mt-10 w-full py-3 rounded-full text-lg font-semibold"
      >
        Xác nhận thanh toán
      </button>
    </div>
  );
}
