import React, { useState, useEffect } from "react";
import axios from "axios"; // Đã thêm Import axios để xử lý xóa
import api_NhanVien from "../../api/api_NhanVien";
import { UserPlus, Search, RotateCcw } from "lucide-react";
import ThemNV from "./ModalThemNV";

// IMPORT CÁC COMPONENT DÙNG CHUNG
import Bang from "../../components/common/Bang";
import NutThaoTacSX from "../../components/common/NutThaoTacSX";
import { NutBam } from "../../components/common/NutBam";

const QuanLyNhanSu = () => {
  const [dsNhanVien, setDsNhanVien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nvDangChon, setNvDangChon] = useState(null);

  // State lọc dữ liệu
  const [tuKhoa, setTuKhoa] = useState("");
  const [locVaiTro, setLocVaiTro] = useState("");
  const [locTrangThai, setLocTrangThai] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api_NhanVien.lay_Danh_Sach();
      if (res.data.success) setDsNhanVien(res.data.data);
      else setDsNhanVien(res.data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- LOGIC XÓA NHÂN VIÊN ---
  const handleXoa = async (id) => {
    if (!id) return;

    const xacNhan = window.confirm(
      `Bạn có chắc chắn muốn xóa nhân viên có mã ${id} không?`,
    );

    if (xacNhan) {
      try {
        // Gọi đến API xóa ở Backend (Cổng 5000)
        const res = await axios.delete(
          `http://localhost:5000/api/auth/nhan-vien/${id}`,
        );

        if (res.data.success) {
          alert("Xóa thành công rồi nhé!");
          loadData(); // Load lại bảng ngay lập tức
        } else {
          alert(res.data.message || "Không thể xóa nhân viên này.");
        }
      } catch (error) {
        console.error("Lỗi xóa:", error);
        alert("Lỗi kết nối máy chủ SpaCar khi thực hiện xóa.");
      }
    }
  };

  // LOGIC LỌC DỮ LIỆU
  const ds_Hien_Thi = dsNhanVien.filter((nv) => {
    const searchLower = tuKhoa.toLowerCase();
    const thoaManTuKhoa =
      nv.HoTen?.toLowerCase().includes(searchLower) ||
      nv.MaNV?.toLowerCase().includes(searchLower) ||
      nv.SDT?.includes(searchLower);

    let thoaManVaiTro = locVaiTro === "" || nv.vaiTro === locVaiTro;

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
      title: "Số điện thoại",
      dataIndex: "SDT",
      render: (text) => (
        <span className="font-medium text-slate-600">{text || "---"}</span>
      ),
    },
    {
      title: "Ngày sinh",
      dataIndex: "NgaySinh",
      render: (text) => {
        if (!text)
          return (
            <span className="text-slate-400 italic text-[12px]">Chưa nhập</span>
          );
        const date = new Date(text);
        return (
          <span className="font-medium text-slate-600">
            {date.toLocaleDateString("vi-VN")}
          </span>
        );
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      render: (text) => (
        <span
          className="text-slate-500 text-[12px] font-medium line-clamp-1 max-w-[180px]"
          title={text}
        >
          {text || "Trống"}
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
          hanhDongSua={() => {
            setNvDangChon(record);
            setIsModalOpen(true);
          }}
          // Đã khớp tên hàm handleXoa ở trên
          hanhDongXoa={() => handleXoa(record.MaNV)}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col p-1 h-full min-w-0 overflow-hidden animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-1 shrink-0">
        <p className="text-slate-400 text-[12px] font-bold">
          Hiện có {ds_Hien_Thi.length} nhân viên trong danh sách lọc
        </p>
        <NutBam
          chu="THÊM NHÂN VIÊN"
          bieuTuong={<UserPlus size={18} />}
          khiBam={() => {
            setNvDangChon(null);
            setIsModalOpen(true);
          }}
          loai="chinh"
        />
      </div>

      <div className="bg-white py-3 px-5 rounded-[24px] shadow-sm mb-6 flex items-center gap-6 border border-slate-100 shrink-0">
        <div className="flex-1 flex items-center gap-3 px-3 border-r border-slate-100">
          <Search className="text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Tìm theo tên, mã hoặc SĐT..."
            className="w-full outline-none text-[14px] font-medium text-slate-600 bg-transparent"
            value={tuKhoa}
            onChange={(e) => setTuKhoa(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-slate-400 uppercase">
            Chức vụ:
          </span>
          <select
            value={locVaiTro}
            onChange={(e) => setLocVaiTro(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 outline-none cursor-pointer hover:bg-white transition-all"
          >
            <option value="">Tất cả</option>
            <option value="Lễ tân">Lễ tân</option>
            <option value="Kỹ thuật viên">Kỹ thuật viên</option>
            <option value="Cố vấn dịch vụ">Cố vấn dịch vụ</option>
            <option value="Admin">Quản trị viên</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-slate-400 uppercase">
            Tình trạng:
          </span>
          <select
            value={locTrangThai}
            onChange={(e) => setLocTrangThai(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 outline-none cursor-pointer hover:bg-white hover:border-blue-300 transition-all shadow-sm"
          >
            <option value="">🔘 Tất cả trạng thái</option>
            <option value="1">🟢 Đang làm việc</option>
            <option value="0">🔴 Đã nghỉ việc</option>
          </select>
        </div>

        {(tuKhoa || locVaiTro || locTrangThai) && (
          <button
            onClick={() => {
              setTuKhoa("");
              setLocVaiTro("");
              setLocTrangThai("");
            }}
            className="flex items-center gap-1 text-[11px] font-black text-red-500 hover:text-red-700 transition-colors uppercase border-l pl-4 border-slate-100"
          >
            <RotateCcw size={14} /> Xóa lọc
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
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
