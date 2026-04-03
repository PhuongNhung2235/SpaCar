import React from "react";
import { Navigate } from "react-router-dom";
import { lay_NguoiDung } from "../utils/luuTru";

const ProtectedRoute = ({ children, ma_Cho_Phep }) => {
  const user = lay_NguoiDung();

  // 1. Nếu chưa đăng nhập -> Đuổi về trang chủ ngay
  if (!user || !user.MaNV) {
    return <Navigate to="/" replace />;
  }

  // 2. LOGIC CỦA NHUNG: Lấy 2 chữ cái đầu của MaNV (VD: AD001 -> AD)
  const dauMa = user.MaNV.substring(0, 2).toUpperCase();

  // 3. Kiểm tra xem đầu mã này có nằm trong danh sách cho phép không
  // ma_Cho_Phep sẽ là ["AD"] hoặc ["KT"], ["LT"], ["CV"]...
  if (!ma_Cho_Phep.includes(dauMa)) {
    alert(`Tài khoản ${user.MaNV} không có quyền vào khu vực này!`);
    return <Navigate to="/trangChu" replace />;
  }

  // 4. Nếu khớp mã -> Cho phép vào trang
  return children;
};

export default ProtectedRoute;
