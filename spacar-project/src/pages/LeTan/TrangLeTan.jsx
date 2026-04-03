import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import { Bell, Search } from "lucide-react";

const TrangLeTan = () => {
  return (
    <div className="flex w-full h-screen max-h-screen bg-[#f8fafc] overflow-hidden box-border font-sans">
      {/* 1. SIDEBAR (Nó sẽ tự hiện Menu Lễ tân vì mình đã sửa logic dauMa === 'LT') */}
      <Sidebar />

      {/* 2. VÙNG NỘI DUNG CHÍNH */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* THANH TOPBAR NHỎ (Cho Lễ tân dễ thao tác) */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-xl w-96">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Tìm nhanh biển số xe hoặc tên khách..."
              className="bg-transparent border-none outline-none text-xs font-bold text-slate-600 w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <span className="text-[11px] font-black text-[#1e3a5a] uppercase tracking-widest">
              Khu vực tiếp đón khách
            </span>
          </div>
        </header>

        {/* NỘI DUNG THAY ĐỔI Ở ĐÂY */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TrangLeTan;
