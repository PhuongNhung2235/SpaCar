// import React from "react";

const Footer = () => {
  return (
    // Giảm padding-top từ 16 xuống 12, padding-bottom từ 8 xuống 6
    <footer className="bg-[#0a2540] text-white pt-12 pb-6 border-t border-blue-900/30">
      {/* Container chính: Giữ nguyên max-width nhưng giảm padding ngang */}
      <div className="max-w-[85%] mx-auto px-0 lg:px-12">
        {/* Giảm gap từ 12 xuống 8 hoặc 10, giảm margin-bottom từ 8 xuống 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-6">
          {/* CỘT 1: LOGO & LIÊN HỆ */}
          <div className="space-y-5">
            {/* Giảm size logo từ 24 (96px) xuống 20 (80px) */}
            <div className="inline-block bg-white p-0.5 rounded-full shadow-2xl border-2 border-blue-900/10">
              <img src="/logo.png" alt="SpaCar Logo" className="h-20 w-20" />
            </div>

            {/* Giảm font-size từ 15px xuống 13px */}
            <div className="space-y-4 text-slate-300 text-[13px]">
              {/* Icon Map Pin: Giảm size từ 20 xuống 18 */}
              <div className="flex items-start gap-3 group cursor-pointer hover:text-white transition-colors">
                <svg
                  className="text-blue-500 shrink-0 mt-1"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="leading-relaxed">
                  02 Thanh Sơn, Quận Hải Châu, <br /> TP. Đà Nẵng
                </span>
              </div>

              {/* Icon Phone: Giảm size từ 18 xuống 16 */}
              <div className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
                <svg
                  className="text-blue-500 shrink-0"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="font-semibold text-white">0896.538.809</span>
              </div>

              {/* Icon Mail: Giảm size từ 18 xuống 16 */}
              <div className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
                <svg
                  className="text-blue-500 shrink-0"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>contact@spacar.vn</span>
              </div>
            </div>
          </div>

          {/* CỘT 2: DỊCH VỤ */}
          <div>
            {/* Giảm text từ 17px xuống 15px, mb-8 xuống mb-6 */}
            <h4 className="font-bold text-[15px] mb-6 border-l-4 border-blue-500 pl-3 uppercase tracking-wider">
              Dịch vụ & Đặt lịch
            </h4>
            <ul className="space-y-3 text-slate-400 text-[13px]">
              {["Quy trình làm việc chuẩn", "Tra cứu trạng thái xe"].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 hover:text-blue-400 hover:translate-x-1.5 transition-all cursor-pointer group"
                  >
                    <svg
                      className="text-blue-500 group-hover:text-blue-400"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    {item}
                  </li>
                ),
              )}
              <li className="flex items-center gap-2 text-blue-500 font-bold hover:underline cursor-pointer">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                Đặt lịch hẹn trực tuyến
              </li>
            </ul>
          </div>

          {/* CỘT 3: HỖ TRỢ */}
          <div>
            <h4 className="font-bold text-[15px] mb-6 border-l-4 border-blue-500 pl-3 uppercase tracking-wider">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-3 text-slate-400 text-[13px]">
              {[
                "Câu hỏi thường gặp",
                "Chính sách bảo mật",
                "Điều khoản dịch vụ",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 hover:text-blue-400 hover:translate-x-1.5 transition-all cursor-pointer group"
                >
                  <svg
                    className="text-blue-500 group-hover:text-blue-400"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 4: SOCIAL & GIỜ LÀM VIỆC */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-[15px] mb-6 uppercase tracking-wider">
              Theo dõi SpaCar
            </h4>
            <div className="flex gap-3 mb-6">
              {/* Giảm padding social icon từ 3 xuống 2.5 */}
              <a
                href="#"
                className="bg-white/5 p-2.5 rounded-full hover:bg-blue-600 hover:-translate-y-1 transition-all border border-white/10"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-white/5 p-2.5 rounded-full hover:bg-red-600 hover:-translate-y-1 transition-all border border-white/10"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
            <div className="w-full p-3.5 border border-blue-500/20 rounded-xl bg-blue-500/5">
              <p className="text-[12px] text-blue-100 leading-relaxed">
                <span className="block text-blue-400 font-bold mb-1 uppercase text-[10px] tracking-tighter">
                  Giờ làm việc:
                </span>
                Thứ 2 - Chủ Nhật: 08:00 - 18:00
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row justify-around items-center gap-2 text-slate-500">
          <p className="text-[11px] uppercase tracking-[0.15em] text-center md:text-left">
            © 2026 <span className="text-slate-300 font-bold">SpaCar</span>. Bản
            quyền thuộc về SpaCar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
