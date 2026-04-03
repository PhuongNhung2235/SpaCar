import React from "react";

const Bang = ({ columns, data, loading }) => {
  return (
    <div className="bg-white rounded-[20px] shadow-xl overflow-hidden border border-slate-100 overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[900px]">
        {/* VẼ TIÊU ĐỀ CỘT */}
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-6 py-4 text-[11px] font-black text-slate-400 uppercase ${col.align === "center" ? "text-center" : ""}`}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        {/* VẼ DỮ LIỆU */}
        <tbody className="divide-y divide-slate-50">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-20 text-center text-slate-400 italic"
              >
                Đang tải dữ liệu SpaCar...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-20 text-center font-bold text-slate-400 uppercase"
              >
                Không tìm thấy kết quả nào!
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-blue-50/40 transition-colors"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap ${col.align === "center" ? "text-center" : ""}`}
                  >
                    {/* Nếu có hàm render tùy chỉnh thì gọi, không thì in thẳng giá trị ra */}
                    {col.render
                      ? col.render(row[col.dataIndex], row)
                      : row[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Bang;
