import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import { lay_NguoiDung } from "../../utils/luuTru";
import {
  User,
  Car,
  Wrench,
  Package,
  History,
  BarChart3,
  CheckCircle,
  Users,
  UserCheck,
} from "lucide-react";

const TrangQuanTri = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = lay_NguoiDung();
    setUser(data);
  }, []);

  // DANH SÁCH MENU CHUẨN ẢNH + ICON MENU CON
  const menuAdmin = [
    {
      label: "QUẢN LÝ TÀI KHOẢN",
      icon: <User />,
      subItems: [
        { label: "Nhân sự", path: "/admin/nhan-vien", icon: <Users /> },
        { label: "Khách hàng", path: "/admin/khach-hang", icon: <UserCheck /> },
      ],
    },
    { label: "DANH MỤC XE", path: "/admin/xe", icon: <Car /> },
    { label: "QUẢN LÝ DỊCH VỤ", path: "/admin/dich-vu", icon: <Wrench /> },
    { label: "QUẢN LÝ PHỤ TÙNG", path: "/admin/phu-tung", icon: <Package /> },
    { label: "NHẬP XUẤT KHO", path: "/admin/kho", icon: <History /> },
    { label: "BÁO CÁO THỐNG KÊ", path: "/admin/thong-ke", icon: <BarChart3 /> },
    { label: "QUẢN LÝ ƯU ĐÃI", path: "/admin/uu-dai", icon: <CheckCircle /> },
  ];

  return (
    <div className="flex w-full h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar thu gọn đúng chuẩn */}
      <Sidebar menuItems={menuAdmin} user={user} />

      {/* LỀ CỰC MỎNG (p-1) ĐỂ TỐI ƯU KHÔNG GIAN */}
      <div className="flex-1 flex flex-col h-full overflow-hidden p-1">
        {/* Khung nội dung trắng bo cong nhẹ */}
        <div className="bg-white w-full h-full rounded-xl shadow-sm border border-slate-200/60 overflow-y-auto custom-scrollbar p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TrangQuanTri;
