export default function Banner({ title, count }) {
    return (
      <div className="bg-indigo-700 py-8 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="text-indigo-100 mt-2">{count} sản phẩm</p>
        </div>
      </div>
    );
  }
  