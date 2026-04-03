import React, { useState, useEffect } from "react";
import api_NhanVien from "../../api/api_NhanVien";
import { X } from "lucide-react";

// --- HÀM HỖ TRỢ 1: Chuyển đổi ngày thành YYYY-MM-DD cho ô Input ---
const dinhDangNgayChoInput = (chuoiNgay) => {
  if (!chuoiNgay || chuoiNgay === "0000-00-00") return "";
  const date = new Date(chuoiNgay);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// --- HÀM HỖ TRỢ 2: Kiểm tra độ tuổi lao động (18 - 70) ---
const kiemTraTuoiLaoDong = (ngaySinh) => {
  if (!ngaySinh) return { hopLe: true };
  const homNay = new Date();
  const ngaySinhDate = new Date(ngaySinh);

  let tuoi = homNay.getFullYear() - ngaySinhDate.getFullYear();
  const thangChenhLech = homNay.getMonth() - ngaySinhDate.getMonth();

  if (
    thangChenhLech < 0 ||
    (thangChenhLech === 0 && homNay.getDate() < ngaySinhDate.getDate())
  ) {
    tuoi--;
  }

  if (tuoi < 18)
    return { hopLe: false, msg: "Nhân viên chưa đủ 18 tuổi Nhung ơi!" };
  if (tuoi >= 70)
    return { hopLe: false, msg: "Nhân viên đã trên 70 tuổi rồi!" };

  return { hopLe: true };
};

const ModalThemNV = ({ isVisible, handleCancel, onSuccess, dataSua }) => {
  const [formData, setFormData] = useState({
    HoTen: "",
    NgaySinh: "",
    SDT: "",
    vaiTro: "Lễ tân",
    email: "",
    diaChi: "",
    trangThai: 1,
    matKhau: "123456", // Mật khẩu mặc định khi tạo mới
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // 1. CẬP NHẬT DỮ LIỆU KHI MỞ MODAL
  useEffect(() => {
    if (dataSua) {
      setFormData({
        ...dataSua,
        NgaySinh: dinhDangNgayChoInput(dataSua.NgaySinh),
      });
    } else {
      setFormData({
        HoTen: "",
        NgaySinh: "",
        SDT: "",
        vaiTro: "Lễ tân",
        email: "",
        diaChi: "",
        trangThai: 1,
        matKhau: "123456",
      });
    }
    setErrors({});
  }, [dataSua, isVisible]);

  // 2. VALIDATE SỐ ĐIỆN THOẠI
  const validateSDT = (value) => {
    const regexKyTu = /^[+0-9]*$/;
    const sdtChiSo = value.replace("+", "");
    if (!regexKyTu.test(value)) return "Chỉ được chứa số và dấu +!";
    if (value.indexOf("+") > 0) return "Dấu + phải nằm ở đầu!";
    if (sdtChiSo.length > 15) return "Số điện thoại quá dài!";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Bắt lỗi thời gian thực
    if (name === "SDT") {
      const errorMsg = validateSDT(value);
      setErrors((prev) =>
        errorMsg ? { ...prev, SDT: errorMsg } : { ...prev, SDT: undefined },
      );
    }

    if (name === "NgaySinh") {
      const checkTuoi = kiemTraTuoiLaoDong(value);
      setErrors((prev) =>
        !checkTuoi.hopLe
          ? { ...prev, NgaySinh: checkTuoi.msg }
          : { ...prev, NgaySinh: undefined },
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra tổng quát trước khi gửi
    const checkTuoiFinal = kiemTraTuoiLaoDong(formData.NgaySinh);
    if (!checkTuoiFinal.hopLe) {
      setErrors((prev) => ({ ...prev, NgaySinh: checkTuoiFinal.msg }));
      return;
    }

    const sdtChiSo = formData.SDT.replace("+", "");
    if (sdtChiSo.length < 10) {
      setErrors((prev) => ({ ...prev, SDT: "SĐT phải ít nhất 10 chữ số!" }));
      return;
    }

    setLoading(true);
    try {
      let res;
      if (dataSua) {
        // Gọi API cập nhật
        res = await api_NhanVien.sua_Nhan_Vien(dataSua.MaNV, formData);
      } else {
        // Gọi API thêm mới (Backend sẽ tự sinh mã LT, KT, AD theo vai trò)
        res = await api_NhanVien.them_Nhan_Vien(formData);
      }

      if (res.data.success) {
        alert(dataSua ? "Cập nhật thành công!" : res.data.message);
        onSuccess();
        handleCancel();
      } else {
        alert("Lỗi: " + res.data.message);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Nhung ơi, không kết nối được máy chủ rồi!");
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-in zoom-in duration-300">
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xl font-black text-[#1e3a5a] tracking-tighter uppercase italic">
            {dataSua ? `Sửa nhân sự: ${dataSua.MaNV}` : "Thêm cộng sự mới"}
          </h3>
          <button
            onClick={handleCancel}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {!dataSua && (
            <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100 flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] font-black text-blue-600 uppercase italic tracking-widest">
                Mã định danh sẽ được SpaCar cấp tự động!
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-5">
            {/* HỌ TÊN */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
                Họ và Tên
              </label>
              <input
                required
                name="HoTen"
                value={formData.HoTen}
                onChange={handleChange}
                className="w-full px-5 py-3 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-600 transition-all font-medium"
                placeholder="Nguyễn Văn A"
              />
            </div>

            {/* NGÀY SINH */}
            <div className="space-y-1 relative">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
                Ngày sinh
              </label>
              <input
                required
                type="date"
                name="NgaySinh"
                value={formData.NgaySinh}
                onChange={handleChange}
                className={`w-full px-5 py-3 border-2 rounded-2xl outline-none transition-all font-medium ${
                  errors.NgaySinh
                    ? "border-red-500 bg-red-50"
                    : "border-slate-100 focus:border-blue-600"
                }`}
              />
              {errors.NgaySinh && (
                <p className="text-red-500 text-[9px] font-black italic absolute -bottom-4 left-1 uppercase">
                  * {errors.NgaySinh}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* SỐ ĐIỆN THOẠI */}
            <div className="space-y-1 relative">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
                Số điện thoại
              </label>
              <input
                required
                name="SDT"
                value={formData.SDT}
                onChange={handleChange}
                className={`w-full px-5 py-3 border-2 rounded-2xl outline-none transition-all font-bold ${
                  errors.SDT
                    ? "border-red-500 bg-red-50"
                    : "border-slate-100 focus:border-blue-600"
                }`}
                placeholder="+84..."
              />
              {errors.SDT && (
                <p className="text-red-500 text-[9px] font-black italic absolute -bottom-4 left-1 uppercase">
                  * {errors.SDT}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-600 transition-all font-medium"
                placeholder="nv.a@spacar.vn"
              />
            </div>
          </div>

          {/* ĐỊA CHỈ */}
          <div className="space-y-1 pt-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
              Địa chỉ thường trú
            </label>
            <input
              required
              name="diaChi"
              value={formData.diaChi}
              onChange={handleChange}
              className="w-full px-5 py-3 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-600 transition-all font-medium"
              placeholder="Số nhà, đường, quận/huyện..."
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* CHỨC VỤ */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
                Chức vụ tại Gara
              </label>
              <select
                name="vaiTro"
                value={formData.vaiTro}
                onChange={handleChange}
                className="w-full px-5 py-3 border-2 border-slate-100 rounded-2xl outline-none bg-white font-bold text-[#1e3a5a]"
              >
                <option value="Lễ tân">Lễ tân</option>
                <option value="Kỹ thuật viên">Kỹ thuật viên</option>
                <option value="Cố vấn dịch vụ">Cố vấn dịch vụ</option>
                <option value="Admin">Quản trị viên</option>
              </select>
            </div>

            {/* TRẠNG THÁI (CHỈ HIỆN KHI SỬA) */}
            {dataSua && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
                  Trạng thái
                </label>
                <select
                  name="trangThai"
                  value={formData.trangThai}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border-2 border-slate-100 rounded-2xl outline-none bg-white font-bold"
                >
                  <option value={1}>🟢 Đang làm việc</option>
                  <option value={0}>🔴 Đã nghỉ việc</option>
                </select>
              </div>
            )}
          </div>

          {/* NÚT THAO TÁC */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3.5 border-2 border-slate-100 rounded-2xl font-black text-slate-400 hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 bg-[#1e3a5a] text-white rounded-2xl font-black shadow-xl hover:bg-blue-800 disabled:opacity-50 transition-all uppercase tracking-widest text-xs"
            >
              {loading
                ? "Đang xử lý..."
                : dataSua
                  ? "Lưu thay đổi"
                  : "Xác nhận thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalThemNV;
