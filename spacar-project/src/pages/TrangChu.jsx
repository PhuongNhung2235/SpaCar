import React from "react";

const TrangChu = () => {
  return (
    <section
      className="relative w-full h-[600px] bg-cover bg-center flex items-center overflow-hidden"
      style={{ backgroundImage: "url('/gara.png')" }}
    >
      <div className="w-full flex justify-start items-center px-8 md:px-16 z-10 text-white">
        <div className="w-full lg:w-[60%] flex flex-col justify-center">
          <div className="flex flex-col">
            <div className="text-6xl md:text-[120px] font-black mb-0 tracking-tighter leading-none cursor-default">
              SpaCar
            </div>

            <div className="space-y-1.5 mt-3">
              <div className="text-4xl md:text-6xl font-bold ml-2 whitespace-nowrap tracking-tight">
                Chuẩn quy trình
              </div>

              <div className="text-4xl md:text-6xl font-light italic pl-10 opacity-90 whitespace-nowrap tracking-tight">
                trọn niềm tin
              </div>
            </div>
          </div>

          <button className="mt-12 ml-8 bg-[#e5e7eb] text-[#0a2540] font-bold py-4 px-10 rounded-full w-fit hover:bg-white transition-all shadow-2xl uppercase tracking-[0.15em] text-sm">
            Đặt lịch chăm sóc ngay
          </button>
        </div>
      </div>

      {/* Overlay cho mobile */}
      <div className="absolute inset-0 bg-blue-900/40 lg:hidden"></div>
    </section>
  );
};

export default TrangChu;
