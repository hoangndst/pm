# BÁO CÁO BÀI TẬP LỚN NHÓM 4

---

## Thành viên:

- Nguyễn Đình Hoàng: frontend, backend, deploy
- Lê Trung Hiếu: backend
- Lương Trung Kiên: frontend, backend
- Nguyễn Đức Chính: backend
- Hoàng Thu Giang: frontend
- Lê Thị Cẩm Nhung: frontend

## Đề tài nhóm

**Tên sản phẩm** _Manager-pro_

**Đối tượng khách hàng** _Các doanh nghiệp, công ty muốn quản lý dự án một cách có tổ chức_

**Các chức năng chính của sản phẩm**
- Người dùng có thể tạo các team và thêm thành viên vào đó. Lúc này người tạo sẽ có quyền admin trong team.
- Admin có thể tạo project với các thành viên trong team.
- Tạo các task ở trong project với deadline và chỉ định thành viên nào sẽ làm. 
Từ 1 task có thể tạo nhiều task con. Sau khi hoàn thành thì tích để xác nhận.
- Để lại comment dưới từng task.
- Admin có thể xóa team, project cũng như task.
- Nhắn tin với các người dùng khác thông qua cửa sổ message.
- Xem trang profile của người dùng khác.
- Thấy và đọc được thông báo hiện lên khi có thay đổi/hoạt động mới liên quan đến bạn cũng như team của bạn.

## Các công nghệ được sử dụng

### Frontend
- React
- Material UI
### Backend
- NodeJs
- ExpressJs
- Postgresql Database

## Hướng dẫn cài đặt và sử dụng sản phẩm đối với môi trường development

- Clone mã nguồn về.
- Tạo Database với tên w42g4_lms trong Postgresql
- Trước tên tại file pm, mở terminal lên và chạy lệnh 
`npm install @mui/material @emotion/react @emotion/styled`
- Tạo một terminal mới, `cd` vào thư mực pm-server,
chạy lệnh `npm install`
- Tạo một terminal mới, `cd` vào thư mục pm-client, 
chạy lệnh `npm install` xong `npm start`
- Gõ "localhost:3000" trong browser để được đưa tới trang web sản phẩm

## Hướng dẫn build cho môi trường production

- Clone mã nguồn về.
- Tạo Database với tên w42g4_lms trong Postgresql và import data từ
- Trước tên tại file pm, mở terminal lên và chạy lệnh 
`npm install @mui/material @emotion/react @emotion/styled`
- Tạo một terminal mới, `cd` vào thư mực pm-server,
chạy lệnh `npm install` rồi `npm run build`
- 
