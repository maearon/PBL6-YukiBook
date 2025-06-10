export function LoadingSpinner() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <div className="animate-ping absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-blue-400 opacity-20"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Đang tải hồ sơ...</p>
          <p className="text-gray-500 text-sm mt-1">Vui lòng đợi trong giây lát</p>
        </div>
      </div>
    )
  }
  