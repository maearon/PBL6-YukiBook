import BookCard from "../../components/BookCard";

export default function ProductsGrid({ books, loading, resetFilters }) {
  if (loading && books.length > 0) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (!books.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          Không tìm thấy sách phù hợp với bộ lọc đã chọn
        </p>
        <button
          onClick={resetFilters}
          className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Xóa bộ lọc
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
