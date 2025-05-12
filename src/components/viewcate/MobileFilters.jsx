import { Filter, ChevronDown, X } from "lucide-react";

export default function MobileFilters({
  show,
  toggle,
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortOption,
  onSortChange,
}) {
  return (
    <>
      {/* Mobile filter & sort bar */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <button
          onClick={toggle}
          className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
        >
          <Filter size={16} className="mr-2" />
          Bộ lọc
        </button>
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
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

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 z-50 bg-white transform ${
          show ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Bộ lọc</h2>
          <button onClick={toggle} className="p-1">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-full pb-32">
          {/* Category */}
          <div className="mb-6">
            <h3 className="text-gray-900 font-medium mb-3">Danh mục</h3>
            <div className="space-y-2">
              <div
                onClick={() => onCategoryChange(null)}
                className={`cursor-pointer py-1 px-2 rounded ${
                  !selectedCategory
                    ? "bg-indigo-100 text-indigo-700"
                    : "hover:bg-gray-100"
                }`}
              >
                Tất cả
              </div>
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => onCategoryChange(cat)}
                  className={`cursor-pointer py-1 px-2 rounded ${
                    selectedCategory?.id === cat.id
                      ? "bg-indigo-100 text-indigo-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <h3 className="text-gray-900 font-medium mb-3">Khoảng giá</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-gray-600 text-sm">Từ</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => onPriceChange("min", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  min="0"
                />
              </div>
              <div>
                <label className="text-gray-600 text-sm">Đến</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => onPriceChange("max", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Apply */}
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
            <button
              onClick={toggle}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Áp dụng bộ lọc
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
