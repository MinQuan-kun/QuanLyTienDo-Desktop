# Hệ Thống Theo Dõi Tiến Độ (Bản Desktop)

Ứng dụng desktop chạy độc lập trên hệ điều hành Windows, tự động kết nối dữ liệu trực tuyến.

---

## 📥 Hướng Dẫn Tải Về & Cài Đặt (Cho Người Dùng)

Bạn có thể tải phiên bản mới nhất của ứng dụng tại mục **Releases** của dự án:
👉 **[Tải ứng dụng tại đây (GitHub Releases)](https://github.com/TÊN_TÀI_KHOẢN_CỦA_BẠN/QuanLyTienDo-Desktop/releases)** *(Hãy thay link này bằng link Repo thật sau khi tạo)*

Tại trang tải về, bạn chọn một trong hai phiên bản dưới phần **Assets**:

1.  **Bản Cài Đặt (`TheoDoiTienDo Setup 1.0.0.exe` - Khuyên dùng):**
    *   **Cách cài:** Tải về, nhấp đúp vào file để cài đặt tự động.
    *   **Sử dụng:** Sau khi cài xong, ứng dụng sẽ tạo biểu tượng (shortcut) ngoài màn hình chính (Desktop). Từ các lần sau, chỉ cần click đúp vào biểu tượng đó để mở phần mềm.
2.  **Bản Chạy Ngay (`TheoDoiTienDo 1.0.0.exe` - Portable):**
    *   **Cách dùng:** Tải về và nhấp đúp chạy trực tiếp, không cần qua bước cài đặt. Thích hợp lưu trữ trong USB để dùng trên nhiều máy tính khác nhau.

*Lưu ý: Máy tính cần có kết nối mạng Internet khi sử dụng ứng dụng.*

---

## 💻 Hướng Dẫn Dành Cho Lập Trình Viên

Nếu bạn muốn thay đổi mã nguồn hoặc đóng gói lại ứng dụng:

### 1. Chuẩn Bị
Đảm bảo đã sao chép 2 tệp tin sau từ dự án chính và đặt vào thư mục `desktop-app/`:
*   `start_app.exe` (File thực thi backend đã build).
*   `.env` (Tệp chứa chuỗi kết nối cơ sở dữ liệu MongoDB Atlas).

### 2. Chạy Thử (Chế độ Dev)
```bash
# Cài đặt thư viện
npm install

# Khởi chạy Electron
npm start
```
Hoặc nhấp đúp chạy trực tiếp file **`start_desktop.bat`**.

### 3. Đóng Gói Lại Thành File `.exe`
```bash
npm run dist
```
Hoặc nhấp đúp chạy trực tiếp file **`build_desktop.bat`**. File cài đặt mới sẽ nằm trong thư mục `dist/`.
