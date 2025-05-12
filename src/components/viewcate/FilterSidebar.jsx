export default function FilterSidebar({
    categories,
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceChange,
    sortOption,
    onSortChange,
  }) {
    return (
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Categories */}
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
  
          {/* Sort */}
          <div>
            <h3 className="text-gray-900 font-medium mb-3">Sắp xếp theo</h3>
            <div className="border border-gray-300 rounded overflow-hidden">
              {[
                { key: "default", label: "Mặc định" },
                { key: "price-asc", label: "Giá: Thấp đến cao" },
                { key: "price-desc", label: "Giá: Cao đến thấp" },
                { key: "name-asc", label: "Tên: A-Z" },
                { key: "name-desc", label: "Tên: Z-A" },
              ].map((opt, i, arr) => (
                <div
                  key={opt.key}
                  onClick={() => onSortChange(opt.key)}
                  className={`cursor-pointer py-2 px-3 ${
                    sortOption === opt.key
                      ? "bg-indigo-50 text-indigo-700"
                      : "hover:bg-gray-50"
                  } ${i < arr.length - 1 ? "border-b border-gray-300" : ""}`}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  