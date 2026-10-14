# FER202 — React Router cơ bản

Mỗi câu là một project độc lập, có `package.json` và source riêng. Để chạy một câu, mở terminal tại thư mục câu đó:

```powershell
cd D:\ky5\fer202\slot10\bai1
npm install
npm run dev
```

Thay `bai1` bằng `bai2`, `bai3`, `bai4` hoặc `bai5` để chạy câu tương ứng. Chỉ cần chạy `npm install` một lần cho mỗi project.

Trong từng project, `src/pages` chứa các trang, `src/components` chứa component tái sử dụng (phần khung chung nằm trong `components/layout`), `src/data` chứa dữ liệu tĩnh khi cần và `src/assets` dành cho tài nguyên tĩnh. `src/App.jsx` khai báo route; `src/main.jsx` khởi động ứng dụng.

Để commit riêng một câu, chạy tại thư mục repository:

```bash
git add slot10/bai1
git commit -m "feat(TODO1): hien thi trang chu"
```

Đổi cả đường dẫn `bai1` và mã TODO theo câu đang làm. Các project còn lại không được thêm vào commit nếu không `git add` chúng.
