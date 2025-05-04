import React from "react";
import PropTypes from "prop-types";

// Tabs để lọc theo thể loại sách
export default function FilterTabs({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {/* Tab "All" luôn xuất hiện đầu tiên */}
      <button
        onClick={() => onCategoryChange("All")}
        className={`px-4 py-2 border rounded-full text-sm font-medium ${
          activeCategory === "All" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        All
      </button>

      {/* Các category từ props */}
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 border rounded-full text-sm font-medium ${
            activeCategory === cat ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// Xác định kiểu dữ liệu props
FilterTabs.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};
