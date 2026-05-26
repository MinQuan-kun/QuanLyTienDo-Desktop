# Ứng Dụng Desktop Theo Dõi Tiến Độ (TheoDoiTienDo)

Dự án này là lớp vỏ bọc ứng dụng máy tính (Desktop wrapper) sử dụng **Electron** để chạy hệ thống Theo Dõi Tiến Độ (gồm React Frontend và Node.js Backend). Nó giúp chuyển đổi toàn bộ ứng dụng web thành phần mềm desktop `.exe` chạy độc lập, có icon thanh tác vụ (Taskbar) riêng và hoạt động không cần hiển thị cửa sổ dòng lệnh (CMD) của backend.

---

## 🏗️ Cấu Trúc Thư Mục Quan Trọng

*   `main.js`: Mã nguồn điều khiển Electron (Main Process), tự khởi chạy backend `start_app.exe`, theo dõi cổng API và quản lý cửa sổ hiển thị.
*   `start_desktop.bat`: Script khởi chạy nhanh ứng dụng ở chế độ phát triển (Development).
*   `build_desktop.bat`: Script đóng gói ứng dụng thành file cài đặt `.exe`.
*   `dist/`: Thư mục chứa các file đóng gói đầu ra (sẽ xuất hiện sau khi build).
    *   `TheoDoiTienDo Setup 1.0.0.exe`: Trình cài đặt (NSIS installer).
    *   `TheoDoiTienDo 1.0.0.exe`: Phiên bản chạy ngay không cần cài đặt (Portable).

---

## 🛠️ Yêu Cầu Chuẩn Bị Trước Khi Chạy/Build

Ứng dụng Desktop này hoạt động độc lập và cần hai thành phần được sao chép từ dự án chính (hoặc tạo thủ công):
1.  **`start_app.exe`**: File thực thi Backend & Frontend đã được đóng gói (build từ thư mục backend chính). Đặt file này ngay tại thư mục gốc của thư mục `desktop-app/`.
2.  **`.env`**: File cấu hình môi trường chứa chuỗi kết nối cơ sở dữ liệu MongoDB và cổng hoạt động.

> [!NOTE]
> File `.env` và `start_app.exe` đã được cấu hình tự động bỏ qua trong `.gitignore` để tránh đẩy dữ liệu cấu hình nhạy cảm và file nhị phân lớn lên kho lưu trữ GitHub.

---

## 🚀 Hướng Dẫn Phát Triển & Chạy Thử

1.  **Cài đặt các thư viện liên quan:**
    Nếu bạn clone repository này lần đầu, hãy cài đặt các node modules:
    ```bash
    npm install
    ```

2.  **Chạy thử ứng dụng:**
    Chạy file script `start_desktop.bat` (hoặc chạy lệnh dưới đây) để khởi động Electron:
    ```bash
    npm start
    ```
    Electron sẽ tự động chạy `start_app.exe` dưới nền và hiển thị giao diện khi API sẵn sàng.

---

## 📦 Hướng Dẫn Đóng Gói Thành File Cài Đặt `.exe`

Khi bạn muốn đóng gói ứng dụng để chia sẻ cho người dùng khác tải về:

1.  **Khởi chạy file script build:**
    Chạy file `build_desktop.bat` (hoặc chạy lệnh sau):
    ```bash
    npm run dist
    ```

2.  **Nhận kết quả:**
    Sau khi tiến trình kết thúc, hãy vào thư mục `dist/` để lấy file cài đặt:
    *   `TheoDoiTienDo Setup 1.0.0.exe` (Dành cho người dùng muốn cài đặt vào máy).
    *   `TheoDoiTienDo 1.0.0.exe` (Bản portable chạy ngay, phù hợp copy vào USB).

---

## 🌐 Hướng Dẫn Phát Hành Lên GitHub Releases (Dành cho Quản Trị Viên)

Để người dùng cuối có thể dễ dàng tải xuống các file `.exe` cài đặt:

1.  Truy cập vào kho lưu trữ GitHub mới của ứng dụng desktop này.
2.  Nhấp vào mục **Releases** ở thanh bên phải -> **Draft a new release**.
3.  Tạo thẻ phiên bản mới (ví dụ: `v1.0.0`) và nhập tên tiêu đề (ví dụ: `Release v1.0.0`).
4.  Kéo và thả các tệp tin trong thư mục `dist/` vào khu vực tải lên:
    *   `TheoDoiTienDo Setup 1.0.0.exe`
    *   `TheoDoiTienDo 1.0.0.exe`
5.  Nhấp **Publish release** để công khai bản phát hành. Người dùng chỉ cần vào mục Releases để tải file `.exe` về cài đặt và sử dụng.
