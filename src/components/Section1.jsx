import { Search, BookOpen, Download, BookCheck } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Section1() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const onSearch = () => {
    const kw = keyword.trim();
    if (!kw) return;
    navigate(`/viewcate?keyword=${encodeURIComponent(kw)}`);
  };

  return (
    <div className="relative">
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white pt-24 pb-32 overflow-visible">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -top-24 -left-12 rounded-full w-64 h-64 bg-white/30"></div>
          <div className="absolute top-1/3 -right-24 rounded-full w-80 h-80 bg-white/20"></div>
          <div className="absolute -bottom-16 left-1/3 rounded-full w-72 h-72 bg-white/10"></div>
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Khám phá kho eBook tuyệt vời
            </h1>
            <p className="text-lg md:text-xl mb-10 text-indigo-100">
              Hàng ngàn cuốn sách số, nội dung đa dạng và cập nhật liên tục
            </p>

            {/* Search box */}
            <div className="relative max-w-xl mx-auto mb-10">
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onSearch()}
                placeholder="Tìm kiếm sách, tác giả..."
                className="w-full py-4 px-6 pr-12 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={onSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
              >
                <Search size={20} />
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/viewcate')}
                className="inline-block rounded-full bg-white text-indigo-600 font-semibold px-8 py-3 hover:bg-gray-100 transition-colors shadow-md"
              >
                Khám phá ngay
              </button>
              <button
                onClick={() => navigate('/viewcate')}
                className="inline-block rounded-full bg-indigo-700 text-white font-semibold px-8 py-3 hover:bg-indigo-800 transition-colors border border-indigo-500"
              >
                Xem danh mục
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Now outside the section but positioned relative to the container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 -mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white text-gray-800 p-6 rounded-2xl shadow-xl">
          {/* Service 1 */}
          <div className="flex items-center gap-4 p-4">
            <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
              <BookOpen size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Thư viện phong phú</h4>
              <p className="text-sm text-gray-500">Hàng ngàn đầu sách mới cập nhật</p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="flex items-center gap-4 p-4">
            <div className="bg-purple-100 p-3 rounded-full text-purple-600">
              <Download size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Tải xuống dễ dàng</h4>
              <p className="text-sm text-gray-500">Đọc mọi lúc mọi nơi, không giới hạn</p>
            </div>
          </div>

          {/* Service 3 */}
          <div className="flex items-center gap-4 p-4">
            <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
              <BookCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Chất lượng đảm bảo</h4>
              <p className="text-sm text-gray-500">Nội dung được kiểm duyệt kỹ lưỡng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}