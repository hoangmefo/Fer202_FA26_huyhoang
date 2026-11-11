# Slot 19 — Redux, Redux Thunk & Redux Toolkit

Ứng dụng thực hành 5 bài Redux: Redux thuần với Counter và Todo, Redux Thunk
với Users, Redux Toolkit với giỏ hàng và CRUD sinh viên dùng `createAsyncThunk`.
Chọn bài học trên thanh điều hướng để chuyển giữa các ví dụ; tất cả dùng chung
một Redux store để dễ quan sát state và action trong Redux DevTools.

## Chạy ứng dụng

```bash
npm install
npm start
```

- Vite: http://localhost:5173
- JSON Server: http://localhost:9999/students
- Bài Users sử dụng JSONPlaceholder: https://jsonplaceholder.typicode.com/users

`npm run dev` chỉ chạy giao diện; `npm run server` chỉ chạy API sinh viên.
CRUD sinh viên cần JSON Server. Dữ liệu thay đổi được lưu trong `database.json`.

## Nội dung

1. **Counter — Redux thuần:** action, reducer, store, dispatch, `useSelector` và `useDispatch`.
2. **Todo — Redux thuần:** `combineReducers`, selector, thêm/sửa/xóa và bộ lọc.
3. **Users — Redux Thunk:** tải users và posts bất đồng bộ, trạng thái loading/error.
4. **RTK Shop:** `createSlice`, selector memo hóa, giới hạn tồn kho và lưu giỏ hàng vào localStorage.
5. **Sinh viên — RTK CRUD:** `createAsyncThunk`, tìm kiếm, sắp xếp, thống kê, validate và CRUD qua JSON Server.
