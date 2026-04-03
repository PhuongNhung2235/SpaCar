import axios from "axios";

const API_URL = "http://localhost:5000/api/nhanvien";

const api_NhanVien = {
  lay_Danh_Sach: () => axios.get(API_URL),
  them_Nhan_Vien: (data) => axios.post(API_URL, data),
  sua_Nhan_Vien: (maNV, data) => axios.put(`${API_URL}/${maNV}`, data),
  xoa_Nhan_Vien: (maNV) => axios.delete(`${API_URL}/${maNV}`),
};

export default api_NhanVien;
