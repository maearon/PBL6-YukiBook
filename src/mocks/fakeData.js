// fakeData.js - Data giả dùng để test UI

// Danh sách đơn hàng (dùng chung cho customer, shop owner, admin)
export const fakeOrders = [
    { id: 1, customer: "Nguyễn Văn A", total: 450000, status: "pending", date: "2024-04-15" },
    { id: 2, customer: "Trần Thị B", total: 720000, status: "shipped", date: "2024-04-16" },
    { id: 3, customer: "Phạm Văn C", total: 210000, status: "delivered", date: "2024-04-17" },
  ];
  
  // Danh sách sản phẩm
  export const fakeProducts = [
    { id: 1, name: "Sách tư duy phản biện", price: 150000, stock: 10 },
    { id: 2, name: "Sách lập trình web", price: 200000, stock: 5 },
    { id: 3, name: "Sách nghệ thuật sống", price: 100000, stock: 20 },
  ];
  
  // Danh sách người dùng (Admin quản lý)
  export const fakeUsers = [
    { id: 1, fullname: "Nguyễn Văn A", email: "a@example.com", role: "Customer" },
    { id: 2, fullname: "Shop Owner B", email: "b@example.com", role: "Shop Owner" },
    { id: 3, fullname: "Admin C", email: "c@example.com", role: "Admin" },
  ];
  
  // Danh sách cửa hàng
  export const fakeShops = [
    { id: 1, name: "Cửa hàng A", owner: "Shop Owner B", active: true },
    { id: 2, name: "Cửa hàng B", owner: "Shop Owner C", active: false },
  ];
  
  // Danh sách danh mục
  export const fakeCategories = [
    { id: 1, name: "Kỹ năng sống" },
    { id: 2, name: "Lập trình" },
    { id: 3, name: "Tiểu thuyết" },
  ];
  