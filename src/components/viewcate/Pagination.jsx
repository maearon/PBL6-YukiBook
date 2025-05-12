export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
      <div className="mt-8 flex justify-center">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className={`py-2 px-4 border border-gray-300 rounded-l-md ${
              currentPage === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Trước
          </button>
  
          {[...Array(totalPages).keys()].map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`py-2 px-4 border-t border-b border-gray-300 ${
                currentPage === p
                  ? "bg-indigo-50 text-indigo-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {p + 1}
            </button>
          ))}
  
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className={`py-2 px-4 border border-gray-300 rounded-r-md ${
              currentPage === totalPages - 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Tiếp
          </button>
        </nav>
      </div>
    );
  }
  