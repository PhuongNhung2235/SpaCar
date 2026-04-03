import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import TrangChu from "./pages/TrangChu";
import AuthModal from "./components/layout/AuthModal";

// Import cho Admin
import TrangQuanTri from "./pages/Admin/TrangQuanTri";
import QuanLyNhanSu from "./pages/Admin/QuanLyNhanSu";
import QuanLyKhachHang from "./pages/Admin/QuanLyKhachHang.jsx";

// Import cho Lễ tân
import TrangLeTan from "./pages/LeTan/TrangLeTan";
import PhieuTiepNhan from "./pages/LeTan/PhieuTiepNhan";

// Import cho cố vấn dịch vụ
import TrangCoVan from "./pages/CoVan/TrangCoVan";
import QuanLyKho from "./pages/LeTan/PhieuTiepNhan";
import TaoPhuongAn from "./pages/LeTan/PhieuTiepNhan";
import TaoUuDai from "./pages/LeTan/PhieuTiepNhan";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const background = location.state && location.state.background;

  // 1. Kiểm tra trạng thái đăng nhập từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  // 2. LOGIC QUAN TRỌNG: Xác định khi nào hiện Header/Footer
  // Chúng ta sẽ ẩn Header/Footer nếu đường dẫn bắt đầu bằng /admin hoặc /receptionist
  const laTrangQuanLy =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/letan") ||
    location.pathname.startsWith("/covan") ||
    location.pathname.startsWith("/kythuat");

  // Hiện Header/Footer khi: KHÔNG phải trang quản lý (tức là trang dành cho khách/người dùng vãng lai)
  const hienHeaderFooter = !laTrangQuanLy;

  return (
    <div className="min-h-screen flex flex-col w-full font-sans bg-slate-50">
      {/* 3. HIỆN HEADER: Chỉ hiện ở trang công cộng hoặc khi là Khách hàng */}
      {hienHeaderFooter && <Header />}

      <main className="flex-1 w-full flex flex-col">
        {/* LỚP NỀN: Routes chính */}
        <Routes location={background || location}>
          {/* Điều hướng "/" */}
          <Route path="/" element={<TrangChu />} />

          <Route path="/trangChu" element={<TrangChu />} />

          {/* Khu vực Admin (Sử dụng Layout riêng có Sidebar) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute ma_Cho_Phep={["AD"]}>
                <TrangQuanTri />
              </ProtectedRoute>
            }
          >
            <Route path="nhan-vien" element={<QuanLyNhanSu />} />
            <Route path="khach-hang" element={<QuanLyKhachHang />} />
            <Route
              index
              element={
                <div className="p-10 font-bold text-slate-400">
                  Chào mừng Nhung đến với Dashboard SpaCar!
                </div>
              }
            />
          </Route>

          {/* Khu vực Lễ tân */}
          <Route
            path="/letan"
            element={
              <ProtectedRoute ma_Cho_Phep={["LT"]}>
                <TrangLeTan />
              </ProtectedRoute>
            }
          >
            <Route index element={<PhieuTiepNhan />} />
          </Route>
          <Route
            path="/covan"
            element={
              <ProtectedRoute ma_Cho_Phep={["CV"]}>
                <TrangCoVan />
              </ProtectedRoute>
            }
          >
            {/* Các chức năng theo Use Case của Nhung */}
            <Route index element={<TaoPhuongAn />} />
            <Route path="phan-chia-nhiem-vu" element={<TaoPhuongAn />} />{" "}
            {/* Thường nằm chung trong phương án */}
            <Route path="kho" element={<QuanLyKho />} />
            <Route path="uu-dai" element={<TaoUuDai />} />
          </Route>
          {/* Trang Đăng nhập trực tiếp */}
          <Route path="/login" element={<TrangChu />} />
        </Routes>

        {/* LỚP MODAL: Hiện đè AuthModal lên nền Trang chủ */}
        {background && (
          <Routes>
            <Route
              path="/login"
              element={<AuthModal isOpen={true} onClose={() => navigate(-1)} />}
            />
          </Routes>
        )}
      </main>

      {/* 4. HIỆN FOOTER: Chỉ hiện ở trang công cộng */}
      {hienHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
