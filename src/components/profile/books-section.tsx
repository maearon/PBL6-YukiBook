"use client"

import { BookOpen, Download, Calendar, HardDrive } from "lucide-react"

export function BooksSection({ books, onDownload }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <BookOpen className="mr-2 text-green-600" size={24} />
          Sách đã mua ({books.length})
        </h2>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {books.length} cuốn sách
        </div>
      </div>

      <div className="space-y-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 bg-gradient-to-r from-white to-gray-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">{book.name}</h3>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1 text-blue-500" />
                    <span>Ngày mua: {book.purchaseDate}</span>
                  </div>
                  <div className="flex items-center">
                    <HardDrive size={14} className="mr-1 text-purple-500" />
                    <span>Kích thước: {book.size}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onDownload(book)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ml-4"
              >
                <Download size={16} className="mr-2" />
                Tải về
              </button>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">Bạn chưa mua cuốn sách nào</p>
          <p className="text-gray-400 text-sm">Khám phá thư viện sách của chúng tôi</p>
        </div>
      )}
    </div>
  )
}
