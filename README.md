# Petro-Track | Hệ thống Quản lý Dự án Dầu khí

**Petro-Track** là một ứng dụng web Single Page Application (SPA) cao cấp, được thiết kế chuyên dụng để tổng hợp, theo dõi và quản lý tiến độ các dự án trong ngành Dầu khí (Oil & Gas).

Ứng dụng chạy hoàn toàn ở phía client (Client-side), lưu trữ dữ liệu an toàn trong trình duyệt thông qua **IndexedDB** và **localStorage**, không yêu cầu cấu hình cơ sở dữ liệu hay máy chủ phức tạp. Nhờ đó, bạn có thể triển khai chạy web hoàn toàn miễn phí trên **GitHub Pages** chỉ trong vài phút.

---

## 🌟 Các Tính năng Nổi bật

1. **Giao diện tối (Dark Mode) Cao cấp & Độc bản**: Phối màu công nghiệp năng lượng hiện đại, hiển thị sắc nét các thẻ chỉ số KPI và sơ đồ điều khiển.
2. **Hỗ trợ Song ngữ (VI / EN)**: Chuyển đổi ngôn ngữ Việt - Anh linh hoạt tức thì toàn diện từ tiêu đề, nội dung thẻ đến biểu đồ.
3. **Tự động Khởi tạo Tiến độ (WBS)**: Khi tạo mới một dự án, ứng dụng sẽ tự động sinh ra kế hoạch tiến độ gồm 6 giai đoạn tiêu chuẩn dầu khí (*Feasibility, FEED, Detailed Design, Procurement, Construction, Commissioning*).
4. **Sơ đồ Gantt Tương tác**: Cập nhật tiến độ dự án thời gian thực thông qua thanh trượt kéo thả mượt mà trên sơ đồ Gantt trực quan.
5. **Hệ thống Quản lý Tài liệu (DMS)**: Cho phép tạo cấu trúc thư mục ảo và tải trực tiếp các tệp tin (PDF, bản vẽ DWG, Excel, Word...) từ máy tính cá nhân lên lưu trữ trực tiếp trong bộ nhớ IndexedDB của trình duyệt.
6. **Sao lưu & Khôi phục (Backup & Restore)**: Dễ dàng xuất toàn bộ dữ liệu dự án cùng các file tài liệu đã upload thành một tệp tin JSON tải về máy tính và khôi phục lại bất kỳ lúc nào.
7. **Bảng Rủi ro & Tài chính (CAPEX/OPEX)**: Theo dõi ngân sách kế hoạch so với thực chi cùng nhật ký hoạt động hàng tuần của dự án.

---

## 📂 Cấu trúc Dự án

```
oil-gas-project-tracker/
├── index.html         # Khung sườn giao diện chính và cấu trúc Modal
├── css/
│   └── style.css      # Thiết kế chi tiết, Dark Mode và vẽ Gantt bằng CSS
└── js/
    ├── app.js         # Bộ điều phối trung tâm, lắng nghe sự kiện
    ├── db.js          # Quản lý lưu trữ tệp tin nhị phân và dữ liệu bằng IndexedDB
    ├── data.js        # Định nghĩa từ điển song ngữ và dữ liệu mẫu (Seed Data)
    ├── components.js  # Bộ sinh HTML động (Gantt, DMS Explorer, Risks Table)
    └── charts.js      # Cấu hình vẽ biểu đồ tổng hợp bằng Chart.js
```

---

## 💻 Hướng dẫn Chạy ứng dụng dưới Local (Máy tính cá nhân)

Vì ứng dụng sử dụng mô-đun Javascript hiện đại (ES6 Modules `type="module"`), các trình duyệt web sẽ chặn việc mở trực tiếp tệp `index.html` bằng cách nhấp đúp từ ổ đĩa cứng vì lý do bảo mật (chính sách CORS). 

Để chạy ứng dụng trên máy tính của bạn, hãy sử dụng một máy chủ web cục bộ đơn giản theo một trong các cách sau:

### Cách 1: Sử dụng Python (Đơn giản nhất nếu máy có sẵn Python)
1. Mở cửa sổ Terminal hoặc PowerShell tại thư mục dự án.
2. Chạy lệnh:
   ```bash
   python -m http.server 8000
   ```
3. Truy cập trình duyệt theo địa chỉ: `http://localhost:8000`

### Cách 2: Sử dụng NodeJS / NPM
1. Chạy lệnh trực tiếp không cần cài đặt:
   ```bash
   npx serve
   ```
2. Mở trình duyệt theo địa chỉ được hiển thị trên màn hình (thường là `http://localhost:3000` hoặc `http://localhost:5000`).

### Cách 3: Sử dụng Extension của VS Code (Nếu dùng VS Code)
- Nhấp chuột phải vào tệp `index.html` và chọn **Open with Live Server**.

---

## 🚀 Hướng dẫn Đưa dự án lên GitHub Pages để chạy Web miễn phí

Để chạy ứng dụng này trực tiếp trên internet thông qua tên miền cá nhân miễn phí của GitHub (ví dụ: `https://ten-tai-khoan.github.io/oil-gas-project-tracker/`), hãy làm theo các bước sau:

### Bước 1: Tạo kho lưu trữ (Repository) trên GitHub
1. Truy cập [github.com](https://github.com) và đăng nhập vào tài khoản của bạn.
2. Tạo một Repository mới, đặt tên tùy chọn (ví dụ: `oil-gas-project-tracker`), chọn chế độ **Public** (Công khai).

### Bước 2: Đẩy mã nguồn lên GitHub từ máy tính của bạn
Mở Git Bash hoặc Terminal tại thư mục dự án và chạy các lệnh sau:

```bash
# Khởi tạo git cục bộ
git init

# Thêm tất cả các file vào khu vực chuẩn bị commit
git add .

# Commit phiên bản đầu tiên
git commit -m "Initial commit of Petro-Track Web App"

# Liên kết với kho lưu trữ trên GitHub (thay liên kết dưới bằng link repo của bạn)
git remote add origin https://github.com/ten-tai-khoan/oil-gas-project-tracker.git

# Đẩy mã nguồn lên nhánh chính (main)
git branch -M main
git push -u origin main
```

### Bước 3: Kích hoạt GitHub Pages
1. Tại giao diện dự án trên GitHub, chọn tab **Settings** (Cài đặt) ở thanh công cụ phía trên.
2. Ở thanh menu bên trái, tìm đến mục **Pages** (dưới phần *Code and automation*).
3. Tại phần **Build and deployment**:
   - Mục **Source**: Chọn **Deploy from a branch**.
   - Mục **Branch**: Chọn nhánh **main** (hoặc `master`), thư mục gốc `/ (root)`.
4. Nhấn nút **Save** (Lưu).

Chờ khoảng 1-2 phút, GitHub sẽ xuất bản trang web của bạn. Đường dẫn trang web của bạn sẽ hiển thị ngay phía trên cùng của trang cấu hình Pages (dạng `https://<ten-tai-khoan>.github.io/<ten-repository>/`).

---

## 💾 Lưu ý về Bảo mật & Lưu trữ Dữ liệu
- Toàn bộ dữ liệu dự án và tệp tin bạn tải lên được mã hóa và lưu trữ **trực tiếp trên trình duyệt của bạn** (IndexedDB cục bộ). Không có dữ liệu nào được chuyển về máy chủ ngoài.
- **Khuyến nghị**: Hãy thường xuyên nhấn nút **"Xuất Backup" (Export Backup)** trên thanh công cụ để lưu trữ một bản sao lưu dữ liệu dự án ra máy tính của bạn. Nếu bạn đổi máy tính hoặc xóa lịch sử trình duyệt web, bạn có thể dễ dàng phục hồi bằng nút **"Nhập Backup" (Import Backup)**.
