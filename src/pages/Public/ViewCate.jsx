import React, { useState, useEffect } from "react";
import BookCard from "../../components/BookCard";
import { Filter, ArrowUpDown, ChevronDown, Menu, X } from "lucide-react";

// Giả lập dữ liệu sách và danh mục
const DUMMY_CATEGORIES = [
  { id: 1, name: "Văn học" },
  { id: 2, name: "Kinh tế" },
  { id: 3, name: "Tâm lý học" },
  { id: 4, name: "Kỹ năng sống" },
  { id: 5, name: "Thiếu nhi" },
  { id: 6, name: "Khoa học" },
];

const DUMMY_BOOKS = [
  {
    id: 1,
    name: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 120000,
    categoryId: 4,
    file_url: "https://picsum.photos/id/1019/400/600",
  },
  {
    id: 2,
    name: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 85000,
    categoryId: 1,
    file_url: "https://picsum.photos/id/1019/400/600",
  },
  {
    id: 3,
    name: "Người Giàu Có Nhất Thành Babylon",
    author: "George S. Clason",
    price: 95000,
    categoryId: 2,
    file_url: "https://picsum.photos/id/1019/400/600",
  },
  {
    id: 4,
    name: "Tâm Lý Học Đám Đông",
    author: "Gustave Le Bon",
    price: 110000,
    categoryId: 3,
    file_url: "https://picsum.photos/id/1019/400/600",
  },
  {
    id: 5,
    name: "Harry Potter và Hòn Đá Phù Thủy",
    author: "J.K. Rowling",
    price: 150000,
    categoryId: 5,
    file_url: "https://picsum.photos/id/1019/400/600",
  },
  {
    id: 6,
    name: "Vũ Trụ Trong Vỏ Hạt Dẻ",
    author: "Stephen Hawking",
    price: 180000,
    categoryId: 6,
    file_url: "https://picsum.photos/id/1019/400/600",
  },
  {
    id: 7,
    name: "Dạy Con Làm Giàu",
    author: "Robert Kiyosaki",
    price: 140000,
    categoryId: 2,
    file_url: "https://picsum.photos/id/1019/400/600",
  },
  {
    id: 8,
    name: "Thương Nhớ Mười Hai",
    author: "Vũ Bằng",
    price: 90000,
    categoryId: 1,
    file_url: "https://picsum.photos/id/1019/400/600",
  },
];

export default function BooksByCategory() {
  // Trong ứng dụng thực tế, categoryId nên được trích xuất từ query params hoặc context
  const [categoryId, setCategoryId] = useState(null);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Giả lập API call để lấy sách
  useEffect(() => {
    // Nếu có categoryId, lọc sách theo danh mục đó
    // Nếu không, hiển thị tất cả sách
    if (categoryId) {
      const catId = parseInt(categoryId);
      setBooks(DUMMY_BOOKS.filter((book) => book.categoryId === catId));
      setSelectedCategory(DUMMY_CATEGORIES.find((cat) => cat.id === catId));
    } else {
      setBooks(DUMMY_BOOKS);
    }
  }, [categoryId]);

  // Lọc và sắp xếp sách khi các bộ lọc thay đổi
  useEffect(() => {
    let result = [...books];

    // Lọc theo danh mục được chọn
    if (selectedCategory) {
      result = result.filter((book) => book.categoryId === selectedCategory.id);
    }

    // Lọc theo khoảng giá
    result = result.filter(
      (book) => book.price >= priceRange.min && book.price <= priceRange.max
    );

    // Sắp xếp theo tùy chọn
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Mặc định không sắp xếp
        break;
    }

    setFilteredBooks(result);
  }, [books, selectedCategory, sortOption, priceRange]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCategoryId(category ? category.id : null);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePriceChange = (type, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: parseInt(value) || 0,
    }));
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="bg-indigo-700 py-8 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">
            {selectedCategory ? selectedCategory.name : "Tất cả sách"}
          </h1>
          <p className="text-indigo-100 mt-2">
            {filteredBooks.length} sản phẩm
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Mobile filter button */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <button
              onClick={toggleMobileFilters}
              className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            >
              <Filter size={16} className="mr-2" />
              Bộ lọc
            </button>

            <div className="relative">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 pr-10"
              >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="name-asc">Tên: A-Z</option>
                <option value="name-desc">Tên: Z-A</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Sidebar filters - Mobile */}
          <div
            className={`fixed inset-0 z-50 bg-white transform ${
              showMobileFilters ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 lg:hidden`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Bộ lọc</h2>
              <button onClick={toggleMobileFilters} className="p-1">
                <X size={24} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-full pb-32">
              {/* Categories filter */}
              <div className="mb-6">
                <h3 className="text-gray-900 font-medium mb-3">Danh mục</h3>
                <div className="space-y-2">
                  <div
                    onClick={() => handleCategoryChange(null)}
                    className={`cursor-pointer py-1 px-2 rounded ${
                      !selectedCategory
                        ? "bg-indigo-100 text-indigo-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Tất cả
                  </div>
                  {DUMMY_CATEGORIES.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleCategoryChange(category)}
                      className={`cursor-pointer py-1 px-2 rounded ${
                        selectedCategory?.id === category.id
                          ? "bg-indigo-100 text-indigo-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price range filter */}
              <div className="mb-6">
                <h3 className="text-gray-900 font-medium mb-3">Khoảng giá</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-gray-600 text-sm">Từ</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange("min", e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm">Đến</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange("max", e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Apply filters button for mobile */}
              <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
                <button
                  onClick={toggleMobileFilters}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Áp dụng bộ lọc
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar filters - Desktop */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Categories filter */}
              <div className="mb-6">
                <h3 className="text-gray-900 font-medium mb-3">Danh mục</h3>
                <div className="space-y-2">
                  <div
                    onClick={() => handleCategoryChange(null)}
                    className={`cursor-pointer py-1 px-2 rounded ${
                      !selectedCategory
                        ? "bg-indigo-100 text-indigo-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Tất cả
                  </div>
                  {DUMMY_CATEGORIES.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleCategoryChange(category)}
                      className={`cursor-pointer py-1 px-2 rounded ${
                        selectedCategory?.id === category.id
                          ? "bg-indigo-100 text-indigo-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price range filter */}
              <div className="mb-6">
                <h3 className="text-gray-900 font-medium mb-3">Khoảng giá</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-gray-600 text-sm">Từ</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange("min", e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm">Đến</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange("max", e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Sort options - Desktop */}
              <div>
                <h3 className="text-gray-900 font-medium mb-3">Sắp xếp theo</h3>
                <div className="border border-gray-300 rounded overflow-hidden">
                  <div
                    onClick={() => setSortOption("default")}
                    className={`cursor-pointer py-2 px-3 ${
                      sortOption === "default"
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-gray-50"
                    } border-b border-gray-300`}
                  >
                    Mặc định
                  </div>
                  <div
                    onClick={() => setSortOption("price-asc")}
                    className={`cursor-pointer py-2 px-3 ${
                      sortOption === "price-asc"
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-gray-50"
                    } border-b border-gray-300`}
                  >
                    Giá: Thấp đến cao
                  </div>
                  <div
                    onClick={() => setSortOption("price-desc")}
                    className={`cursor-pointer py-2 px-3 ${
                      sortOption === "price-desc"
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-gray-50"
                    } border-b border-gray-300`}
                  >
                    Giá: Cao đến thấp
                  </div>
                  <div
                    onClick={() => setSortOption("name-asc")}
                    className={`cursor-pointer py-2 px-3 ${
                      sortOption === "name-asc"
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-gray-50"
                    } border-b border-gray-300`}
                  >
                    Tên: A-Z
                  </div>
                  <div
                    onClick={() => setSortOption("name-desc")}
                    className={`cursor-pointer py-2 px-3 ${
                      sortOption === "name-desc"
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Tên: Z-A
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-3 mt-6 lg:mt-0">
            {/* Results count and sort dropdown - Desktop */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Hiển thị {filteredBooks.length} kết quả
              </p>

              <div className="relative">
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 pr-10"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="name-asc">Tên: A-Z</option>
                  <option value="name-desc">Tên: Z-A</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>

            {/* Books grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Không tìm thấy sách phù hợp với bộ lọc đã chọn
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange({ min: 0, max: 500000 });
                    setSortOption("default");
                  }}
                  className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Pagination placeholder */}
            {filteredBooks.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="inline-flex rounded-md shadow">
                  <a
                    href="#"
                    className="py-2 px-4 border border-gray-300 bg-white rounded-l-md text-gray-700 hover:bg-gray-50"
                  >
                    Trước
                  </a>
                  <a
                    href="#"
                    className="py-2 px-4 border-t border-b border-gray-300 bg-indigo-50 text-indigo-600"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="py-2 px-4 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="py-2 px-4 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    3
                  </a>
                  <a
                    href="#"
                    className="py-2 px-4 border border-gray-300 bg-white rounded-r-md text-gray-700 hover:bg-gray-50"
                  >
                    Tiếp
                  </a>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
