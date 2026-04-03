import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, UserCircle, ChevronUp } from "lucide-react";
import { xoa_Phien_Dang_Nhap } from "../../utils/luuTru";

const Sidebar = ({ menuItems, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Nhung có chắc chắn muốn đăng xuất không?")) {
      xoa_Phien_Dang_Nhap();
      window.location.href = "/";
    }
  };

  return (
    <div className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen shrink-0 font-sans shadow-sm">
      {/* LOGO */}
      <div
        className="p-6 flex justify-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/logo.png" alt="SpaCar" className="h-14 object-contain" />
      </div>

      {/* DANH SÁCH MENU */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item, index) => {
          const hasSub = item.subItems && item.subItems.length > 0;
          // Kiểm tra xem có đang ở trang con của menu này không
          const isChildActive =
            hasSub &&
            item.subItems.some((sub) => location.pathname === sub.path);
          const isSubOpen = openSubMenu === index || isChildActive;
          const isActive = location.pathname === item.path;

          return (
            <div key={index} className="flex flex-col">
              {/* Menu chính: "Sáng đèn" khi active hoặc có con active */}
              <div
                onClick={() =>
                  hasSub
                    ? setOpenSubMenu(openSubMenu === index ? null : index)
                    : navigate(item.path)
                }
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-black text-[11px] uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                  isActive || isChildActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200" // "SÁNG ĐÈN" Ở ĐÂY NHUNG ƠI
                    : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>
                    {React.cloneElement(item.icon, {
                      size: 18,
                      strokeWidth: 2.5,
                    })}
                  </span>
                  {item.label}
                </div>
                {hasSub && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isSubOpen ? "rotate-180" : ""}`}
                  />
                )}
              </div>

              {/* Menu con: Hiện icon cho từng mục con */}
              {hasSub && isSubOpen && (
                <div className="mt-1 ml-4 pl-4 border-l-2 border-slate-100 space-y-1 animate-in fade-in slide-in-from-left-2">
                  {item.subItems.map((sub, idx) => {
                    const isSubActive = location.pathname === sub.path;
                    return (
                      <Link
                        key={idx}
                        to={sub.path}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                          isSubActive
                            ? "text-blue-600 bg-blue-50 border border-blue-100"
                            : "text-slate-400 hover:text-blue-500 hover:bg-slate-50"
                        }`}
                      >
                        {sub.icon && React.cloneElement(sub.icon, { size: 14 })}
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* CARD TÀI KHOẢN (Màu xanh đậm theo ảnh) */}
      <div className="p-3 relative" ref={menuRef}>
        {showProfileMenu && (
          <div className="absolute bottom-[105%] left-2 right-2 bg-[#1e3a5a] text-white rounded-2xl shadow-2xl p-1 z-50 animate-in zoom-in-95 duration-200">
            <button className="w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-black hover:bg-white/10 rounded-xl transition-all uppercase tracking-widest">
              <UserCircle size={14} /> Hồ sơ của tôi
            </button>
            <div className="h-[1px] bg-white/10 my-1 mx-2"></div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-black text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all uppercase tracking-widest"
            >
              <LogOut size={14} /> Thoát hệ thống
            </button>
          </div>
        )}

        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="w-full bg-[#1e3a5a] text-white rounded-2xl p-3 flex items-center justify-between shadow-2xl shadow-blue-900/20"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-black text-lg border border-white/10 shrink-0">
              {user?.HoTen?.charAt(0).toUpperCase() || "N"}
            </div>
            <div className="text-left min-w-0">
              <p className="text-[8px] font-black text-blue-300 uppercase truncate mb-0.5">
                {user?.MaNV || "ADSC_001"}
              </p>
              <p className="text-[12px] font-black truncate leading-tight tracking-tight">
                {user?.HoTen || "Admin SpaCar"}
              </p>
            </div>
          </div>
          <ChevronUp
            size={14}
            className={`text-blue-300 transition-transform duration-300 ${showProfileMenu ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
