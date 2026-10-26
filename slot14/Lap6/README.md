# Lap 6 – Axios, React Router và json-server

Exercise 27 – Phần 3, tiếp nối các bài Axios của slot 13.

## Tiến độ

- TODO 0–2: Project Axios, `async/await`, axios instance, interceptors và service API.
- TODO 3–4: Request song song/tuần tự, `Promise.allSettled`, đo thời gian và hủy request.
- TODO 5–6: Giao diện React-Bootstrap, form validation, modal/toast và CRUD bằng React Router.
- TODO 7: JSON Server 0.17.4, `.env`, dữ liệu mẫu và lưu thay đổi trong `db.json`.
- TODO 8–10: `useAxios`, retry, debounce tìm kiếm, xóa hàng loạt và optimistic update.

## Chạy project

```bash
npm install
npm start
```

- React/Vite: http://localhost:5173
- JSON Server: http://localhost:3001
- API: `/posts`, `/users`, `/comments`

`npm start` chạy Vite và JSON Server đồng thời. Nếu thay đổi `.env`, hãy khởi động lại Vite.
`.env` được bỏ qua bởi Git; khi clone project, sao chép `.env.example` thành `.env`.

## Các route

- `/` – Axios Demo, chọn post ID và kiểm tra hủy request.
- `/http` – Sáu bài HTTP GET/POST/PUT/PATCH/DELETE và cấu hình Axios.
- `/posts` – Danh sách, lọc tác giả, tìm kiếm debounce, phân trang và xóa nhiều bài.
- `/posts/new` – Tạo bài viết.
- `/posts/:id` – Chi tiết, tác giả, bình luận, đo thời gian, PATCH và DELETE.
- `/posts/:id/edit` – Cập nhật toàn bộ bài viết bằng PUT.

`db.json` là dữ liệu runtime và sẽ thay đổi sau khi ghi/xóa. Khôi phục dữ liệu mẫu
bằng cách dừng server rồi sao chép `db.backup.json` đè lên `db.json`.
