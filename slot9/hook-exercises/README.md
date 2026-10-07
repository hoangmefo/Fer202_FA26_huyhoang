# Bài 9 - Theme sáng/tối và đăng nhập với React Context

Ứng dụng thực hành `useContext`, `useState`, custom hook và form đăng nhập dùng
`useReducer`. Theme được áp dụng qua thuộc tính `data-bs-theme` của Bootstrap 5.3.

## Chạy ứng dụng

```sh
npm install
npm run dev
```

## Tài khoản đăng nhập thử

- Email: `admin@fpt.edu.vn`
- Mật khẩu: `12345678`

Form kiểm tra email, mật khẩu, hiển thị trạng thái gửi trong một giây và lỗi khi
đăng nhập thất bại. Đăng nhập thành công sẽ cập nhật `AuthContext`; nút đăng xuất
trên Header đưa ứng dụng về form. Nút trên Header chuyển theme sáng/tối.

`useTheme` và `useAuth` ném lỗi có thông báo rõ ràng nếu được gọi ngoài Provider
tương ứng.
