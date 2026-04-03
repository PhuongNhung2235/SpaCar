import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  UserCircle,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react";
import { lay_NguoiDung, xoa_Phien_Dang_Nhap } from "../../utils/luuTru";

const Header = () => {
  const [nguoiDung, setNguoiDung] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // --- GIỮ NGUYÊN LOGIC CŨ: Cập nhật trạng thái người dùng ---
  const cap_Nhat_Trang_Thai = () => {
    const du_lieu = lay_NguoiDung();
    setNguoiDung(du_lieu);
  };

  useEffect(() => {
    cap_Nhat_Trang_Thai();
    // Lắng nghe sự kiện để cập nhật nút ngay lập tức
    window.addEventListener("storage", cap_Nhat_Trang_Thai);
    return () => {
      window.removeEventListener("storage", cap_Nhat_Trang_Thai);
    };
  }, []);

  const xu_Ly_Dang_Xuat = () => {
    if (
      window.confirm(
        "Nhung có chắc chắn muốn thoát khỏi hệ thống SpaCar không?",
      )
    ) {
      xoa_Phien_Dang_Nhap();
      setNguoiDung(null);
      window.location.href = "/";
    }
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[85%] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between relative">
        {/* GIỮ NGUYÊN: KHU VỰC LOGO */}
        <div
          className="flex-shrink-0 relative h-full flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-50 transform translate-y-0.5">
            <img
              src="logo.png"
              alt="SpaCar Logo"
              className="object-contain p-1"
            />
          </div>
          <div className="w-20" />
        </div>

        {/* GIỮ NGUYÊN: THANH ĐIỀU HƯỚNG CHÍNH */}
        <nav className="hidden lg:flex items-center space-x-8 text-slate-800 font-bold uppercase text-[13px] tracking-wide">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            TRANG CHỦ
          </Link>
          <Link to="/dich-vu" className="hover:text-blue-600 transition-colors">
            DỊCH VỤ
          </Link>
          <a href="/uu-dai" className="hover:text-blue-600 transition-colors">
            Ưu đãi
          </a>
          <a href="/dat-lich" className="text-blue-600 font-black">
            Đặt lịch
          </a>
          <a href="/lien-he" className="hover:text-blue-600 transition-colors">
            Liên hệ
          </a>
        </nav>

        {/* CHỈ CẬP NHẬT LOGIC HIỂN THỊ KHÁCH HÀNG / NHÂN VIÊN */}
        <div className="flex-shrink-0">
          {!nguoiDung ? (
            /* TRƯỜNG HỢP 1: CHƯA ĐĂNG NHẬP (Hiện nút Đăng nhập) */
            <Link
              to="/login"
              state={{ background: location }}
              className="flex items-center gap-2 bg-[#1e3a5a] text-white px-5 py-2 rounded-full font-bold text-[12px] hover:bg-[#152940] transition-all shadow-md active:scale-95 uppercase tracking-tight"
            >
              <UserCircle size={18} />
              <span>Đăng nhập / Đăng ký</span>
            </Link>
          ) : (
            /* TRƯỜNG HỢP 2: ĐÃ ĐĂNG NHẬP (Hiện Profile) */
            <div className="group relative flex items-center gap-3 bg-[#1e3a5a] text-white px-4 py-2 rounded-2xl border border-blue-400/30 shadow-lg cursor-pointer hover:bg-[#12243a] transition-all">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center border border-white/30">
                <span className="text-[14px] font-black text-white">
                  {nguoiDung.HoTen
                    ? nguoiDung.HoTen.charAt(0).toUpperCase()
                    : "U"}
                </span>
              </div>

              <div className="flex flex-col text-left">
                <span className="text-[9px] text-blue-300 font-bold uppercase leading-none mb-1 tracking-widest">
                  {/* Logic: Nếu có MaKH thì hiện MaKH, không thì hiện MaNV, cuối cùng là "Thành viên" */}
                  {nguoiDung.MaKH || nguoiDung.MaNV || "Thành viên"}
                </span>
                <span className="text-[12px] font-black whitespace-nowrap">
                  Chào, {nguoiDung.HoTen}
                </span>
              </div>

              <ChevronDown
                size={14}
                className="ml-1 text-blue-300 group-hover:rotate-180 transition-transform"
              />

              {/* Menu thả xuống - Không xóa logic cũ, chỉ thêm trường hợp cho Admin/Nhân viên */}
              <div className="absolute top-[110%] right-0 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">
                <div className="p-4 border-b border-gray-50 bg-slate-50/50">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Tài khoản SpaCar
                  </p>
                  <p className="text-[13px] font-bold text-slate-700 truncate">
                    {nguoiDung.HoTen}
                  </p>
                </div>

                {/* LOGIC CŨ: Hiện nút Quản trị nếu là Admin */}
                {nguoiDung.vaiTro === "AD" && (
                  <button
                    onClick={() => navigate("/admin")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors text-[12px] font-bold"
                  >
                    <LayoutDashboard size={16} className="text-blue-500" /> QUẢN
                    TRỊ VIÊN
                  </button>
                )}

                {/* Nếu là Nhân viên khác (Lễ tân/Kỹ thuật) thì có thể thêm link riêng ở đây */}
                {["LT", "KT"].includes(nguoiDung.vaiTro) && (
                  <button
                    onClick={() =>
                      navigate(
                        nguoiDung.vaiTro === "LT"
                          ? "/receptionist"
                          : "/technician",
                      )
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors text-[12px] font-bold"
                  >
                    <LayoutDashboard size={16} className="text-blue-500" />{" "}
                    TRANG NGHIỆP VỤ
                  </button>
                )}

                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors text-[12px] font-bold">
                  <User size={16} className="text-blue-500" /> TRANG CÁ NHÂN
                </button>

                <button
                  onClick={xu_Ly_Dang_Xuat}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors text-[12px] font-bold border-t border-gray-50"
                >
                  <LogOut size={16} /> ĐĂNG XUẤT HỆ THỐNG
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
