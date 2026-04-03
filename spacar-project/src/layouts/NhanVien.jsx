import React from "react";
import { lay_NguoiDung } from "../utils/luuTru";

const NhanVien = ({ children }) => {
  const nguoi_dung = lay_NguoiDung();

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar - Thanh bên trái */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-xl font-black italic mb-10 text-blue-400">
          SpaCar Pro
        </h2>
        <nav className="space-y-4">
          {/* Ở đây Nhung sẽ viết logic ẩn/hiện menu dựa trên mã nhân viên */}
          <p className="text-xs text-slate-500 uppercase font-bold">
            Chức vụ: {nguoi_dung?.vaiTro}
          </p>
          <div className="py-2 hover:text-blue-400 cursor-pointer">
            Bảng điều khiển
          </div>
          <div className="py-2 hover:text-blue-400 cursor-pointer">
            Hồ sơ cá nhân
          </div>
        </nav>
      </aside>

      {/* Nội dung chính bên phải */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-xl font-bold">Chào, {nguoi_dung?.HoTen}</h1>
        </header>
        {children} {/* Nơi hiện nội dung riêng của từng trang */}
      </main>
    </div>
  );
};

export default NhanVien;
