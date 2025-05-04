import React from "react";
import { fakeBooks } from "../../mocks/fakeBooks";

// Giả lập danh sách eBook đã mua
const purchasedBooks = [
  { id: 1, title: "The Secrets", fileUrl: "/ebooks/the-secrets.pdf" },
  { id: 2, title: "World Museums", fileUrl: "/ebooks/world-museums.pdf" },
];

export default function CheckoutSuccess() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h2 className="text-3xl font-bold text-primary mb-6">🎉 Thanh toán thành công!</h2>
      <p className="text-gray-600 mb-10">Cảm ơn bạn đã mua sách. Bạn có thể tải xuống các eBook ngay bây giờ:</p>

      <div className="flex flex-col gap-4">
        {purchasedBooks.map((book) => (
          <div key={book.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <a
              href={book.fileUrl}
              download
              className="btn-primary px-6 py-2 rounded-full text-sm"
            >
              Tải xuống
            </a>
          </div>
        ))}
      </div>

      <a
        href="/"
        className="inline-block mt-10 text-primary hover:underline"
      >
        ⬅️ Quay về trang chủ
      </a>
    </div>
  );
}
