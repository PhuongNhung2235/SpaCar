import React from "react";
import { Pencil, Trash2 } from "lucide-react"; // Lấy icon Bút chì và Thùng rác
import { NutLe } from "./NutLe"; // Gọi khuôn đúc nút lẻ vào

const NutThaoTacSX = ({ hanhDongSua, hanhDongXoa }) => {
  return (
    <div className="flex justify-center gap-3">
      {/* NÚT SỬA: Chỉ hiện ra nếu trang có truyền lệnh hanhDongSua */}
      {hanhDongSua && (
        <NutLe
          bieuTuong={<Pencil size={18} />}
          khiBam={hanhDongSua}
          loai="sua"
          tieuDe="Chỉnh sửa thông tin"
        />
      )}

      {/* NÚT XÓA: Chỉ hiện ra nếu trang có truyền lệnh hanhDongXoa */}
      {hanhDongXoa && (
        <NutLe
          bieuTuong={<Trash2 size={18} />}
          khiBam={hanhDongXoa}
          loai="xoa"
          tieuDe="Xóa dữ liệu này"
        />
      )}
    </div>
  );
};

export default NutThaoTacSX;
