// Đường dẫn các trang trên giao diện (Frontend)
export const duongDan = {
  HOME: "/",
  ABOUT_US: "/ve-chung-toi",
  SERVICES: "/dich-vu-spa",
  BOOKING: "/dat-lich",
  // Với đường dẫn động (có truyền ID hoặc Slug), bạn có thể dùng function
  CAR_DETAIL: (carId) => `/xe/${carId}`,
  USER_PROFILE: "/tai-khoan",
  AUTH_MODE: "auth", // Tên của parameter
  LOGIN: "login", // Giá trị
  REGISTER: "register",
};

// Đường dẫn gọi API (Backend endpoints)
export const API_ENDPOINTS = {
  LOGIN: "/api/v1/auth/login",
  GET_SERVICES: "/api/v1/services",
  CREATE_BOOKING: "/api/v1/bookings",
  GET_CAR_INFO: (carId) => `/api/v1/cars/${carId}`,
};
