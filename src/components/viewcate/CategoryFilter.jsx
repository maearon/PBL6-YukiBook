export default function CategoryFilter({ categories, selectedCategory, onSelect }) {
    return (
      <div className="mb-6">
        <h3 className="text-gray-900 font-medium mb-3">Danh mục</h3>
        <div className="space-y-2">
          <div
            onClick={() => onSelect(null)}
            className={`cursor-pointer py-1 px-2 rounded ${
              !selectedCategory ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
            }`}
          >
            Tất cả
          </div>
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => onSelect(cat)}
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
    );
  }
  