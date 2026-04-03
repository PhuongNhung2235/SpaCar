import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api_XacThuc from "../../api/api_XacThuc";
import { luu_NguoiDung } from "../../utils/luuTru";
import O_Nhap_Lieu from "../common/ONhapLieu";
import { X } from "lucide-react";

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [che_do, set_Che_Do] = useState("login");
  const [loi, set_Loi] = useState("");
  const [dang_tai, set_Dang_Tai] = useState(false);
  const [dong_y, set_Dong_Y] = useState(false);

  const [hien_thi_mat_khau, set_Hien_Thi_Mat_Khau] = useState({
    matKhau: false,
    nhapLaiMatKhau: false,
  });
  const [du_lieu_form, set_Du_Lieu_Form] = useState({
    SDT: "",
    matKhau: "",
    HoTen: "",
    email: "",
    nhapLaiMatKhau: "",
  });

  useEffect(() => {
    if (isOpen) {
      set_Che_Do("login");
      set_Loi("");
      set_Du_Lieu_Form({
        SDT: "",
        matKhau: "",
        HoTen: "",
        email: "",
        nhapLaiMatKhau: "",
      });
      set_Dong_Y(false); // Reset checkbox khi mở lại
    }
  }, [isOpen]);

  const xu_ly_thay_doi = (e) =>
    set_Du_Lieu_Form((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // --- PHẦN LOGIC THÊM MỚI NẰM Ở ĐÂY ---
  const bat_dau_xac_nhan = async (e) => {
    e.preventDefault();

    // 1. Kiểm tra logic Đăng ký trước khi gọi API
    if (che_do === "signup") {
      if (!dong_y) return set_Loi("Vui lòng đồng ý chính sách SpaCar nhé!");
      if (du_lieu_form.matKhau !== du_lieu_form.nhapLaiMatKhau) {
        return set_Loi("Mật khẩu xác nhận không khớp rồi!");
      }
      if (!du_lieu_form.HoTen || !du_lieu_form.SDT) {
        return set_Loi("Vui lòng điền đủ Họ tên và Số điện thoại nhé.");
      }
    }

    set_Dang_Tai(true);
    set_Loi("");

    try {
      // 2. Gọi API tương ứng (Đã khớp với /api/auth/signup ở Backend)
      const phan_hoi =
        che_do === "login"
          ? await api_XacThuc.dang_Nhap(du_lieu_form)
          : await api_XacThuc.dang_Ky(du_lieu_form);

      if (phan_hoi.data.success) {
        if (che_do === "login") {
          // Xử lý đăng nhập thành công
          const nguoi_dung = phan_hoi.data.user;
          luu_NguoiDung(nguoi_dung);

          const prefix = nguoi_dung.MaNV?.substring(0, 2).toUpperCase();
          if (prefix === "AD") window.location.href = "/admin";
          else if (prefix === "CV")
            window.location.href = "/covan"; // Cho Lễ tân
          else if (prefix === "LT")
            window.location.href = "/letan"; // Cho Lễ tân
          else if (prefix === "KT") window.location.href = "/kythuatvien";
          else window.location.href = "/trangChu";
        } else {
          // Xử lý đăng ký thành công
          // phan_hoi.data.message lúc này sẽ chứa chuỗi: "Đăng ký thành công! Mã của bạn là: KH030426001"
          alert(phan_hoi.data.message);
          set_Che_Do("login"); // Chuyển về đăng nhập
          set_Du_Lieu_Form((prev) => ({ ...prev, nhapLaiMatKhau: "" })); // Clear pass xác nhận
        }
      } else {
        // Hiện lỗi từ Backend (Ví dụ: SĐT đã tồn tại)
        set_Loi(phan_hoi.data.message);
      }
    } catch (err) {
      console.error("Lỗi API:", err);
      set_Loi("Lỗi kết nối máy chủ SpaCar rồi Nhung ơi.");
    } finally {
      set_Dang_Tai(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-2">
      <div
        className="absolute inset-0 bg-[#1e3a5a]/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-[550px] rounded-[32px] px-10 py-6 shadow-2xl z-10 animate-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-300 hover:text-red-500 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex items-center justify-center gap-3 mb-6">
          <h2
            style={{ color: "#1e3a5a" }}
            className="text-xl font-black uppercase tracking-tighter italic"
          >
            SpaCar {che_do === "login" ? "Đăng nhập" : "Đăng ký"}
          </h2>
        </div>

        {loi && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-[12px] font-bold rounded-xl text-center border border-red-100">
            {loi}
          </div>
        )}

        <form className="space-y-2" onSubmit={bat_dau_xac_nhan}>
          <div className="grid grid-cols-1 gap-2">
            <O_Nhap_Lieu
              label="Số điện thoại"
              name="SDT"
              value={du_lieu_form.SDT}
              onChange={xu_ly_thay_doi}
            />

            {che_do === "signup" && (
              <div className="grid grid-cols-2 gap-3">
                <O_Nhap_Lieu
                  label="Họ tên"
                  name="HoTen"
                  value={du_lieu_form.HoTen}
                  onChange={xu_ly_thay_doi}
                />
                <O_Nhap_Lieu
                  label="Email"
                  name="email"
                  type="email"
                  value={du_lieu_form.email}
                  onChange={xu_ly_thay_doi}
                />
              </div>
            )}

            <O_Nhap_Lieu
              label="Mật khẩu"
              name="matKhau"
              value={du_lieu_form.matKhau}
              onChange={xu_ly_thay_doi}
              type={hien_thi_mat_khau.matKhau ? "text" : "password"}
              onToggleVisible={() =>
                set_Hien_Thi_Mat_Khau((v) => ({ ...v, matKhau: !v.matKhau }))
              }
              dang_Hien_Thi={hien_thi_mat_khau.matKhau}
            />

            {che_do === "signup" && (
              <>
                <O_Nhap_Lieu
                  label="Xác nhận mật khẩu"
                  name="nhapLaiMatKhau"
                  value={du_lieu_form.nhapLaiMatKhau}
                  onChange={xu_ly_thay_doi}
                  type={hien_thi_mat_khau.nhapLaiMatKhau ? "text" : "password"}
                  onToggleVisible={() =>
                    set_Hien_Thi_Mat_Khau((v) => ({
                      ...v,
                      nhapLaiMatKhau: !v.nhapLaiMatKhau,
                    }))
                  }
                  dang_Hien_Thi={hien_thi_mat_khau.nhapLaiMatKhau}
                />
                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={dong_y}
                    onChange={(e) => set_Dong_Y(e.target.checked)}
                    className="w-4 h-4 accent-[#1e3a5a]"
                  />
                  <label
                    htmlFor="agree"
                    className="text-[11px] font-bold text-slate-500 cursor-pointer italic"
                  >
                    Đồng ý chính sách SpaCar
                  </label>
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={dang_tai}
            className="w-full bg-[#1e3a5a] text-white font-black py-3.5 rounded-2xl hover:bg-blue-800 transition-all uppercase tracking-widest text-xs mt-2 shadow-lg"
          >
            {dang_tai
              ? "Đang xử lý..."
              : che_do === "login"
                ? "Xác nhận đăng nhập"
                : "Đăng ký ngay"}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() =>
                set_Che_Do(che_do === "login" ? "signup" : "login")
              }
              className="text-[11px] font-black text-blue-600 hover:underline uppercase tracking-tighter"
            >
              {che_do === "login"
                ? "Chưa có tài khoản? Đăng ký ngay"
                : "Đã có tài khoản? Đăng nhập"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
