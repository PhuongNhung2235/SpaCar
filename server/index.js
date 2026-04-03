const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ============================================================
// 1. KẾT NỐI DATABASE
// ============================================================
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "spacar",
});

db.connect((err) => {
    if (err) {
        console.error("❌ Lỗi kết nối SQL: ", err);
    } else {
        console.log("--- ✅ Đã kết nối Database SpaCar thành công! ---");
    }
});

// ============================================================
// HÀM HỖ TRỢ (HELPERS)
// ============================================================

// Tính tuổi chính xác
const tinhTuoi = (ngaySinh) => {
    if (!ngaySinh) return 0;
    const homNay = new Date();
    const ngaySinhDate = new Date(ngaySinh);
    let tuoi = homNay.getFullYear() - ngaySinhDate.getFullYear();
    const m = homNay.getMonth() - ngaySinhDate.getMonth();
    if (m < 0 || (m === 0 && homNay.getDate() < ngaySinhDate.getDate())) {
        tuoi--;
    }
    return tuoi;
};

// Lấy chuỗi ngày hiện tại ddmmyy
const getNgayHienTai = () => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd}${mm}${yy}`;
};

// ============================================================
// 2. CÁC API NHÂN VIÊN
// ============================================================

// [GET] Lấy danh sách nhân viên
app.get('/api/nhanvien', (req, res) => {
    const sql = "SELECT MaNV, HoTen, NgaySinh, SDT, email, vaiTro, diaChi, trangThai FROM `nhanvien` ORDER BY MaNV DESC";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Lỗi lấy dữ liệu" });
        res.json({ success: true, data: result });
    });
});

// [POST] THÊM NHÂN VIÊN (CHỐNG TRÙNG MÃ + CHẶN TUỔI)
app.post('/api/nhanvien', (req, res) => {
    const { HoTen, SDT, email, matKhau, vaiTro, NgaySinh, diaChi } = req.body;

    // A. Kiểm tra tuổi (18 - 70)
    const tuoi = tinhTuoi(NgaySinh);
    if (tuoi < 18 || tuoi >= 70) {
        return res.json({
            success: false,
            message: `Xin lỗi, nhân viên ${tuoi} tuổi không được nhận (Phải từ 18 - 69 tuổi)!`
        });
    }

    const chuoiNgay = getNgayHienTai();
    let prefix = (vaiTro === "Lễ tân") ? "LT" : (vaiTro === "Kỹ thuật viên") ? "KT" : (vaiTro === "Cố vấn dịch vụ") ? "CV" : (vaiTro === "Quản trị viên") ? "AD" : "NV";

    // B. Tìm mã lớn nhất (MAX) để tránh trùng khi xóa
    const pattern = `${prefix}SC_${chuoiNgay}_%`;
    const sqlMax = "SELECT MaNV FROM nhanvien WHERE MaNV LIKE ? ORDER BY MaNV DESC LIMIT 1";

    db.query(sqlMax, [pattern], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Lỗi tìm mã!" });

        let sttMoi = 1;
        if (result.length > 0) {
            const maMaxHienTai = result[0].MaNV;
            const soCuoi = parseInt(maMaxHienTai.split('_').pop());
            sttMoi = soCuoi + 1;
        }

        const sttChuoi = String(sttMoi).padStart(3, '0');
        const MaNV = `${prefix}SC_${chuoiNgay}_${sttChuoi}`;

        // C. Lưu vào DB
        const sqlInsert = "INSERT INTO nhanvien (MaNV, HoTen, NgaySinh, SDT, email, matKhau, vaiTro, diaChi, trangThai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)";
        db.query(sqlInsert, [MaNV, HoTen, NgaySinh, SDT, email, matKhau, vaiTro, diaChi], (err) => {
            if (err) {
                console.error("Lỗi lưu NV:", err);
                return res.status(500).json({ success: false, message: "Lỗi lưu nhân viên!" });
            }
            res.json({ success: true, message: `Thêm thành công! Mã nhân viên là: ${MaNV}` });
        });
    });
});

// [PUT] Cập nhật thông tin nhân viên
app.put('/api/nhanvien/:maNV', (req, res) => {
    const maNV = req.params.maNV;
    const { HoTen, NgaySinh, SDT, email, vaiTro, diaChi, trangThai } = req.body;

    const tuoi = tinhTuoi(NgaySinh);
    if (NgaySinh && (tuoi < 18 || tuoi >= 70)) {
        return res.json({ success: false, message: `Cập nhật lỗi: Nhân viên ${tuoi} tuổi không hợp lệ!` });
    }

    const sql = "UPDATE `nhanvien` SET `HoTen`=?, `NgaySinh`=?, `SDT`=?, `email`=?, `vaiTro`=?, `diaChi`=?, `trangThai`=? WHERE `MaNV`=?";
    db.query(sql, [HoTen, NgaySinh, SDT, email, vaiTro, diaChi, trangThai, maNV], (err) => {
        if (err) return res.json({ success: false, message: "Lỗi cập nhật dữ liệu!" });
        res.json({ success: true, message: "Cập nhật nhân viên thành công!" });
    });
});

// [DELETE] Xóa nhân viên (Khớp với Frontend của Nhung)
app.delete('/api/auth/nhan-vien/:id', (req, res) => {
    const maNV = req.params.id;
    const sql = "DELETE FROM `nhanvien` WHERE `MaNV` = ?";
    db.query(sql, [maNV], (err, result) => {
        if (err) {
            console.error("Lỗi MySQL khi xóa:", err);
            return res.status(500).json({ success: false, message: "Không thể xóa nhân viên đang có dữ liệu!" });
        }
        res.json({ success: true, message: "Đã xóa nhân viên thành công!" });
    });
});

// ============================================================
// 3. API ĐĂNG NHẬP & ĐĂNG KÝ KHÁCH HÀNG
// ============================================================

// [POST] ĐĂNG NHẬP
app.post('/api/auth/login', (req, res) => {
    const { SDT, matKhau } = req.body;
    const sql = "SELECT MaNV, HoTen, vaiTro FROM `nhanvien` WHERE `SDT` = ? AND `matKhau` = ? AND `trangThai` = 1";
    db.query(sql, [SDT, matKhau], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Lỗi hệ thống" });
        if (result.length > 0) {
            res.json({ success: true, user: result[0] });
        } else {
            res.json({ success: false, message: "Số điện thoại hoặc Mật khẩu không đúng!" });
        }
    });
});

// [POST] ĐĂNG KÝ KHÁCH HÀNG (DÙNG MAX CHỐNG TRÙNG)
app.post('/api/auth/signup', (req, res) => {
    const { SDT, matKhau, HoTen, email } = req.body;
    const chuoiNgay = getNgayHienTai();

    // A. Kiểm tra SĐT
    const sqlCheck = "SELECT * FROM khachhang WHERE SDT = ?";
    db.query(sqlCheck, [SDT], (err, users) => {
        if (users.length > 0) {
            return res.json({ success: false, message: "Số điện thoại này đã đăng ký rồi!" });
        }

        // B. Tìm mã KH lớn nhất
        const pattern = `KH_${chuoiNgay}_%`;
        const sqlMaxKH = "SELECT MaKH FROM khachhang WHERE MaKH LIKE ? ORDER BY MaKH DESC LIMIT 1";

        db.query(sqlMaxKH, [pattern], (err, result) => {
            let sttMoi = 1;
            if (result.length > 0) {
                const soCuoi = parseInt(result[0].MaKH.split('_').pop());
                sttMoi = soCuoi + 1;
            }
            const MaKH = `KH_${chuoiNgay}_${String(sttMoi).padStart(3, '0')}`;

            // C. Lưu khách hàng
            const sqlInsert = "INSERT INTO khachhang (MaKH, SDT, matKhau, HoTen, email) VALUES (?, ?, ?, ?, ?)";
            db.query(sqlInsert, [MaKH, SDT, matKhau, HoTen, email], (err) => {
                if (err) return res.status(500).json({ success: false, message: "Lỗi tạo tài khoản!" });
                res.json({ success: true, message: `Đăng ký thành công! Mã của bạn là: ${MaKH}` });
            });
        });
    });
});

// ============================================================
// 4. KHỞI CHẠY SERVER
// ============================================================
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server SpaCar đang chạy cực mượt tại: http://localhost:${PORT}`);
});