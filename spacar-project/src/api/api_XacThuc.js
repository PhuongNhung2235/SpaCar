import api_SpaCar from "./api_CauHinh";

const api_XacThuc = {
  // Đăng nhập
  dang_Nhap: (du_lieu) => {
    return api_SpaCar.post("/api/auth/login", du_lieu); // Khớp với Backend ở trên
  },

  // Đăng ký
  dang_Ky: (du_lieu) => {
    return api_SpaCar.post("/api/auth/signup", du_lieu); // Khớp với Backend ở trên
  },
};

export default api_XacThuc;
