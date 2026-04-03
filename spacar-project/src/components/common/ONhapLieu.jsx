import React from "react";

const O_Nhap_Lieu = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  dang_Hien_Thi,
  onToggleVisible,
  error, // Thêm prop error để nhận thông báo lỗi
}) => {
  const la_O_Mat_Khau = name === "matKhau" || name === "nhapLaiMatKhau";
  const loai_Input = la_O_Mat_Khau
    ? dang_Hien_Thi
      ? "text"
      : "password"
    : type;

  // Nếu có lỗi thì viền đỏ, không thì viền xám bình thường
  const mau_Vien = error
    ? "border-red-500 focus:border-red-600"
    : "border-slate-100 focus:border-blue-600";

  const mau_Chu = error
    ? "text-red-500 peer-focus:text-red-600"
    : "text-blue-600 peer-focus:text-blue-600";

  return (
    <div className="relative mt-3 pb-5">
      {" "}
      {/* Thêm pb-5 để chừa chỗ cho dòng báo lỗi */}
      <input
        type={loai_Input}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder=" "
        className={`peer w-full border-2 rounded-2xl px-5 py-3 outline-none transition-all placeholder-transparent text-base font-medium ${mau_Vien}`}
      />
      <label
        className={`absolute left-4 -top-2.5 bg-white px-2 text-[11px] font-bold uppercase tracking-widest transition-all 
                   peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal
                   peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:tracking-widest
                   pointer-events-none ${mau_Chu}`}
      >
        {label}
      </label>
      {la_O_Mat_Khau && (
        <button
          type="button"
          onClick={onToggleVisible}
          className="absolute right-5 top-[35%] -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors z-10"
        >
          {/* ... SVG Icon mắt giữ nguyên ... */}
          {dang_Hien_Thi ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="2" y1="2" x2="22" y2="22"></line>
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
              <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
            </svg>
          )}
        </button>
      )}
      {/* HIỆN CHỮ BÁO LỖI Ở ĐÂY */}
      {error && (
        <span className="absolute bottom-0 left-4 text-[11px] font-black text-red-500 italic">
          * {error}
        </span>
      )}
    </div>
  );
};

export default O_Nhap_Lieu;
