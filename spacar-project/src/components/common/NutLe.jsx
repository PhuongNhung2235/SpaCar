import React from "react";

export const NutLe = ({ bieuTuong, khiBam, loai = "sua", tieuDe = "" }) => {
  // Kiểm tra xem nút này là nút "sửa" hay nút "xóa" để lên màu cho chuẩn
  const laNutSua = loai === "sua";

  return (
    <button
      onClick={khiBam}
      title={tieuDe} // Hiện chữ nhỏ nhỏ khi di chuột vào (Tooltip)
      className={`p-2 rounded-full transition-all ${
        laNutSua
          ? "text-blue-500 hover:bg-blue-100" // Sửa thì màu Xanh
          : "text-red-500 hover:bg-red-100" // Xóa thì màu Đỏ
      }`}
    >
      {bieuTuong}
    </button>
  );
};
