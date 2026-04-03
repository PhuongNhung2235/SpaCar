import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import { lay_NguoiDung } from "../../utils/luuTru";
import { FileText, Package, Gift, ClipboardList } from "lucide-react";

const TrangCoVan = () => {
  const [user, setUser] = useState(null);

  // 1. Lấy thông tin Cố vấn để hiện ở Profile Card
  useEffect(() => {
    const data = lay_NguoiDung();
    setUser(data);
  }, []);

  // 2. Định nghĩa danh sách Menu dành riêng cho Cố vấn dịch vụ
  const menuCoVan = [
    {
      label: "Tạo phương án",
      path: "/service-advisor",
      icon: <FileText size={22} />,
    },
    {
      label: "Phân chia nhiệm vụ",
      path: "/service-advisor/nhiem-vu",
      icon: <ClipboardList size={22} />,
    },
    {
      label: "Nhập xuất kho",
      path: "/service-advisor/kho",
      icon: <Package size={22} />,
    },
    {
      label: "Quản lý ưu đãi",
      path: "/service-advisor/uu-dai",
      icon: <Gift size={22} />,
    },
  ];

  return (
    <div className="flex w-full h-screen bg-slate-50 overflow-hidden font-sans">
      {/* SIDEBAR DÙNG CHUNG: Bơm dữ liệu của Cố vấn vào */}
      <Sidebar menuItems={menuCoVan} user={user} />

      {/* KHU VỰC HIỂN THỊ NỘI DUNG (CÁC TRANG NGHIỆP VỤ) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative p-6">
        {/* Khung nội dung bo cong đồng bộ với trang Admin */}
        <div className="bg-white w-full h-full rounded-[48px] shadow-sm border border-slate-100 overflow-y-auto custom-scrollbar p-10">
          {/* Nơi nội dung TaoPhuongAn, QuanLyKho... sẽ hiển thị */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TrangCoVan;
