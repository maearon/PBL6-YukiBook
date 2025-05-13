import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

// Import thực logo MoMo và VNPAY
import momoLogo from "../../assets/momo-logo.png";
import vnpayLogo from "../../assets/vnpay-logo.png";

export default function Checkout() {
  const { user, isAuthLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Lấy thông tin user trước khi tạo order
  useEffect(() => {
    // Đợi auth load xong và có userId
    if (isAuthLoading) return;
    if (!user?.user_id) {
      navigate("/login");
      return;
    }

    // Fetch thông tin user
    axios
      .get(`http://localhost:8081/api/v1/users/${user.user_id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.error("🔥 Lỗi khi fetch thông tin user:", err));

    // Lấy tổng tiền từ state truyền vào
    const amount = location.state?.totalAmount || 0;
    if (amount > 0) {
      setTotalAmount(amount);
    } else {
      alert("Giỏ hàng trống, vui lòng thêm sản phẩm.");
      navigate("/cart");
    }
  }, [isAuthLoading, user, location, navigate]);

  const handleConfirm = async () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    if (!userInfo) {
      alert("Đang lấy thông tin người dùng, vui lòng thử lại sau.");
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        user_id: user.user_id,
        fullname: userInfo.fullname,
        email: userInfo.email,
        phone_number: userInfo.phoneNumber,
        address: userInfo.address,
        notes: "Giao ebook nhanh",
        status: "pending",
        total_money: totalAmount,
        payment_method: paymentMethod,
        active: true,
      };

      await axios.post("http://localhost:8081/api/v1/orders", orderData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (paymentMethod === "vnpay") {
        const response = await axios.get(
          `http://localhost:8081/api/v1/payments/create-payment?amount=${totalAmount}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        if (response.data && response.data.includes("http")) {
          window.location.href = response.data;
        } else {
          alert("Đã xảy ra lỗi khi tạo thanh toán MoMo!");
        }
      } else {
        navigate("/checkout/success");
      }
    } catch (error) {
      console.error("🔥 Lỗi khi xác nhận thanh toán:", error);
      alert("Đã xảy ra lỗi khi xác nhận thanh toán!");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isAuthLoading) return <div>Đang kiểm tra đăng nhập...</div>;

  const methods = [
    {
      key: "vnpay",
      title: "Thanh toán qua VNPAY",
      description: "Quét mã QR hoặc internet banking",
      logo: vnpayLogo,
    },
    {
      key: "momo",
      title: "Thanh toán qua MoMo",
      description: `Quét mã QR hoặc internet banking`,
      logo: momoLogo,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h2 className="text-2xl font-bold mb-6">Chọn phương thức thanh toán</h2>

      <div className="flex flex-col gap-6">
        {methods.map((method) => (
          <div
            key={method.key}
            onClick={() => setPaymentMethod(method.key)}
            className={`relative p-6 border rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
              ${paymentMethod === method.key ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-300"}`}
          >
            <div className="flex items-center">
              <img src={method.logo} alt={method.title} className="h-8 w-auto mr-3" />
              <h3 className="text-lg font-semibold">{method.title}</h3>
            </div>
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