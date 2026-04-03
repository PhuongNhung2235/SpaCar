import React, { useState } from "react";
import { Car, User, ClipboardList, Save } from "lucide-react";
import O_Nhap_Lieu from "../../components/common/ONhapLieu";

const PhieuTiepNhan = () => {
  const [formData, setFormData] = useState({
    tenKhachHang: "",
    sdt: "",
    bienSo: "",
    loaiXe: "",
    tinhTrang: "",
  });

  return (
    <div className="p-8 animate-in slide-in-from-right duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#1e3a5a] uppercase italic">
          Tiếp nhận xe mới
        </h1>
        <p className="text-slate-400 text-sm font-bold">
          Lễ tân lập phiếu tiếp nhận và ghi nhận tình trạng xe
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CỘT TRÁI: THÔNG TIN KHÁCH & XE */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-100 border border-slate-50">
            <h3 className="flex items-center gap-2 text-slate-700 font-black mb-6 uppercase text-sm">
              <Car size={20} className="text-blue-500" /> Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <O_Nhap_Lieu
                label="Tên khách hàng"
                placeholder="Nhập tên khách..."
              />
              <O_Nhap_Lieu label="Số điện thoại" placeholder="090..." />
              <O_Nhap_Lieu label="Biển số xe" placeholder="43A-123.45" />
              <O_Nhap_Lieu
                label="Loại xe / Đời xe"
                placeholder="Toyota Camry 2018"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-100 border border-slate-50">
            <h3 className="flex items-center gap-2 text-slate-700 font-black mb-6 uppercase text-sm">
              <ClipboardList size={20} className="text-orange-500" /> Tình trạng
              hư hỏng
            </h3>
            <textarea
              rows="4"
              className="w-full bg-slate-50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-100 font-medium text-sm text-slate-600"
              placeholder="Ghi chú các vết trầy xước, hỏng hóc khách báo..."
            ></textarea>
          </div>
        </div>

        {/* CỘT PHẢI: XỬ LÝ & THANH TOÁN TẠM TÍNH */}
        <div className="space-y-6">
          <div className="bg-[#1e3a5a] p-8 rounded-[32px] text-white shadow-2xl">
            <h3 className="font-black mb-4 uppercase text-xs tracking-widest text-blue-300">
              Tổng kết phiếu
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Phí dịch vụ:</span>
                <span className="font-bold">Đang tính...</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Ngày tiếp nhận:</span>
                <span className="font-bold">03/04/2026</span>
              </div>
              <hr className="border-blue-400/30" />
              <div className="flex justify-between text-lg font-black italic">
                <span>Tạm thu:</span>
                <span>0 VNĐ</span>
              </div>
            </div>
            <button className="w-full bg-blue-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-400 transition-all shadow-lg flex items-center justify-center gap-2">
              <Save size={18} /> Lập phiếu & In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhieuTiepNhan;
