import React, { useState, useEffect } from "react";
import api_NhanVien from "../../api/api_NhanVien";
import { UserPlus, Search } from "lucide-react";
import ThemNV from "./ModalThemNV";

// IMPORT CÁC COMPONENT DÙNG CHUNG (Giữ nguyên từ code cũ của Nhung)
import Bang from "../../components/common/Bang";
import NutThaoTacSX from "../../components/common/NutThaoTacSX";
import { NutBam } from "../../components/common/NutBam";

const QuanLyNhanSu = () => {
  const [dsNhanVien, setDsNhanVien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nvDangChon, setNvDangChon] = useState(null);

  const [tuKhoa, setTuKhoa] = useState("");
  const [locVaiTro, setLocVaiTro] = useState("");
  const [locTrangThai, setLocTrangThai] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api_NhanVien.lay_Danh_Sach();
      if (res.data.success) {
        setDsNhanVien(res.data.data);
      } else {
        setDsNhanVien(res.data);
      }
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenThemMoi = () => {
    setNvDangChon(null);
    setIsModalOpen(true);
  };

  const handleOpenSua = (nhanVien) => {
    setNvDangChon(nhanVien);
    setIsModalOpen(true);
  };

  const handleXoa = async (maNV) => {
    if (window.confirm(`Xác nhận xóa nhân viên ${maNV}?`)) {
      try {
        const res = await api_NhanVien.xoa_Nhan_Vien(maNV);
        if (res.data.success) {
          alert("Đã xóa nhân viên!");
          loadData();
        }
      } catch (error) {
        alert("Lỗi kết nối hoặc không thể xóa!");
      }
    }
  };

  const ds_Hien_Thi = dsNhanVien.filter((nv) => {
    const searchLower = tuKhoa.toLowerCase();
    const thoaManTuKhoa =
      nv.HoTen?.toLowerCase().includes(searchLower) ||
      nv.MaNV?.toLowerCase().includes(searchLower) ||
      nv.SDT?.includes(searchLower);

    let thoaManVaiTro = true;
    if (locVaiTro !== "") {
      thoaManVaiTro = nv.vaiTro === locVaiTro;
    }

    const trangThaiThucTe =
      nv.trangThai === null || nv.trangThai === undefined
        ? 1
        : Number(nv.trangThai);
    const thoaManTrangThai =
      locTrangThai === "" || trangThaiThucTe === Number(locTrangThai);

    return thoaManTuKhoa && thoaManVaiTro && thoaManTrangThai;
  });

  const columns = [
    {
      title: "Mã NV",
      dataIndex: "MaNV",
      render: (text) => <span className="font-bold text-blue-600">{text}</span>,
    },
    {
      title: "Họ và Tên",
      dataIndex: "HoTen",
      render: (text) => (
        <span className="font-bold text-slate-700">{text}</span>
      ),
    },
    {
      title: "Chức vụ",
      dataIndex: "vaiTro",
      render: (text) => (
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-full border border-blue-100">
          {text}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      align: "center",
      render: (text) =>
        Number(text) === 0 ? (
          <span className="text-red-500 font-bold text-[12px]">🔴 Đã nghỉ</span>
        ) : (
          <span className="text-green-500 font-bold text-[12px]">
            🟢 Đang làm
          </span>
        ),
    },
    {
      title: "Thao tác",
      align: "center",
      render: (_, record) => (
        <NutThaoTacSX
          hanhDongSua={() => handleOpenSua(record)}
          hanhDongXoa={() => handleXoa(record.MaNV)}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col p-5 h-full min-w-0 overflow-hidden animate-in fade-in duration-500">
      {/* HEADER TÁCH BIỆT */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div>
          <h2 className="text-xl font-black text-[#1e3a5a] uppercase">
            Quản lý nhân sự
          </h2>
          <p className="text-slate-500 text-[12px] font-bold italic">
            Tìm thấy {ds_Hien_Thi.length} nhân viên
          </p>
        </div>
        <NutBam
          chu="THÊM NHÂN VIÊN MỚI"
          bieuTuong={<UserPlus size={18} />}
          khiBam={handleOpenThemMoi}
          loai="chinh"
        />
      </div>

      {/* THANH LỌC */}
      <div className="bg-white py-2 px-4 rounded-xl shadow-sm mb-4 flex items-center gap-4 border border-slate-200 shrink-0">
        <div className="flex-1 flex items-center gap-2 px-2 border-r border-slate-100">
          <Search className="text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm nhanh..."
            className="w-full outline-none text-[13px] font-medium"
            value={tuKhoa}
            onChange={(e) => setTuKhoa(e.target.value)}
          />
        </div>
        <select
          value={locVaiTro}
          onChange={(e) => setLocVaiTro(e.target.value)}
          className="px-3 py-1.5 text-[13px] font-bold text-slate-600 outline-none"
        >
          <option value="">Tất cả chức vụ</option>
          <option value="Lễ tân">Lễ tân</option>
          <option value="Kỹ thuật viên">Kỹ thuật viên</option>
          <option value="Cố vấn dịch vụ">Cố vấn dịch vụ</option>
          <option value="Admin">Quản trị viên</option>
        </select>
      </div>

      {/* BẢNG DỮ LIỆU */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <Bang columns={columns} data={ds_Hien_Thi} loading={loading} />
      </div>

      <ThemNV
        isVisible={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
        onSuccess={loadData}
        dataSua={nvDangChon}
      />
    </div>
  );
};

export default QuanLyNhanSu;
