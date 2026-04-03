// Lưu thông tin người dùng vào localStorage
export const luu_NguoiDung = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  // Kích hoạt sự kiện 'storage' để các Component khác (Header) cập nhật ngay lập tức
  window.dispatchEvent(new Event("storage"));
};

// Lấy thông tin người dùng
export const lay_NguoiDung = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Xóa phiên đăng nhập (Logout)
export const xoa_Phien_Dang_Nhap = () => {
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("storage"));
};
