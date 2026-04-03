import React from "react";

export const NutBam = ({
  chu, // Chữ hiển thị trên nút (VD: "Thêm nhân viên mới")
  bieuTuong, // Icon (VD: <UserPlus size={20} />)
  khiBam, // Hàm sẽ chạy khi click vào nút
  loai = "chinh", // "chinh" (Màu xanh), "phu" (Màu xám/trắng), "do" (Màu đỏ báo lỗi)
  loaiNut = "button", // "button" bình thường hoặc "submit" cho form
  biVoHieu = false, // true thì nút sẽ mờ đi và không bấm được (VD: Đang tải dữ liệu)
}) => {
  // 1. Định dạng khung chuẩn chung cho mọi nút SpaCar
  const dinhDangChung =
    "flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg active:scale-95";

  // 2. Chỉnh màu sắc tùy theo loại nút Nhung muốn
  let mauSac = "";
  if (loai === "chinh") {
    // Màu xanh chuẩn SpaCar như trong ảnh của Nhung
    mauSac = "bg-[#1890ff] hover:bg-[#40a9ff] text-white";
  } else if (loai === "phu") {
    // Nút phụ (Dùng cho nút Hủy)
    mauSac =
      "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50";
  } else if (loai === "do") {
    // Nút nguy hiểm (Dùng cho Xóa)
    mauSac = "bg-red-500 hover:bg-red-600 text-white shadow-red-200";
  }

  return (
    <button
      type={loaiNut}
      onClick={khiBam}
      disabled={biVoHieu}
      className={`${dinhDangChung} ${mauSac} ${biVoHieu ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {bieuTuong && <span>{bieuTuong}</span>}
      <span>{chu}</span>
    </button>
  );
};
