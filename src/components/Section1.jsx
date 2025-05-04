import React from "react";

export default function Section1() {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Khám phá kho eBook tuyệt vời
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Tải xuống hàng ngàn eBook chất lượng, đọc mọi lúc mọi nơi.
        </p>
        <a
          href="#products"
          className="inline-block rounded-full bg-yellow-400 text-gray-800 font-semibold px-8 py-3 hover:bg-yellow-300 transition"
        >
          Khám phá ngay
        </a>
      </div>

      {/* Dịch vụ */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-4xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white text-gray-800 p-6 rounded-lg shadow-lg">
          {/* Service 1 */}
          <div className="flex items-center gap-4">
            <div className="text-3xl">🔒</div>
            <div>
              <h4 className="font-bold">Thanh toán an toàn</h4>
              <p className="text-sm text-gray-500">Bảo mật thông tin tuyệt đối</p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="flex items-center gap-4">
            <div className="text-3xl">💬</div>
            <div>
              <h4 className="font-bold">Hỗ trợ 24/7</h4>
              <p className="text-sm text-gray-500">Tư vấn tận tâm, nhanh chóng</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
  