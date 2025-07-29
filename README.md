# Ứng dụng học từ vựng tiếng Trung với Spaced Repetition

Ứng dụng web giúp học từ vựng tiếng Trung hiệu quả với phương pháp Spaced Repetition (lặp lại có khoảng cách).

## 🚀 Tính năng chính

### 📚 Quản lý từ vựng
- ✅ Thêm từ vựng mới với đầy đủ thông tin (chữ Hán, Pinyin, nghĩa tiếng Việt)
- ✅ Thêm ví dụ câu và ghi chú cho từng từ
- ✅ Xem danh sách tất cả từ vựng đã học
- ✅ Xóa từ vựng (soft delete)

### 🔄 Hệ thống Spaced Repetition
- ✅ Tự động tính toán lịch ôn tập dựa trên kết quả học tập
- ✅ 6 cấp độ học tập với khoảng cách ôn tập tăng dần:
  - Level 1: 1 ngày
  - Level 2: 3 ngày  
  - Level 3: 1 tuần
  - Level 4: 2 tuần
  - Level 5: 1 tháng
  - Level 6: 2 tháng

### 📊 Thống kê học tập
- ✅ Xem số từ cần ôn tập hôm nay
- ✅ Theo dõi tiến độ học tập
- ✅ Thống kê tỷ lệ thành công

### 🎯 Giao diện ôn tập
- ✅ Giao diện ôn tập trực quan và dễ sử dụng
- ✅ Hiển thị từng từ một với đáp án ẩn/hiện
- ✅ Đánh giá kết quả (Đúng/Sai) để cập nhật level

## 🛠️ Công nghệ sử dụng

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite với Prisma ORM
- **Form Handling**: React Hook Form với Zod validation
- **Icons**: Lucide React

## 📦 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn

### Bước 1: Clone và cài đặt dependencies
```bash
cd chinese-vocab-app
npm install
```

### Bước 2: Cấu hình database
```bash
# Tạo database và generate Prisma client
npx prisma db push
```

### Bước 3: Chạy ứng dụng
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: http://localhost:3000

## 📖 Cách sử dụng

### 1. Thêm từ vựng mới
- Click nút "Thêm từ mới" trên header
- Điền đầy đủ thông tin: chữ Hán, Pinyin, nghĩa tiếng Việt
- Thêm ví dụ câu và ghi chú (tùy chọn)
- Click "Thêm từ vựng"

### 2. Ôn tập hàng ngày
- Xem danh sách từ cần ôn tập hôm nay trên trang chủ
- Click "Bắt đầu ôn tập" để vào chế độ ôn tập
- Xem từ tiếng Trung, thử đọc Pinyin và nghĩa
- Click "Xem đáp án" để kiểm tra
- Đánh giá "Đúng" hoặc "Sai" để cập nhật level

### 3. Theo dõi tiến độ
- Xem thống kê tổng quan trên trang chủ
- Theo dõi số từ đã học và cần ôn tập
- Kiểm tra lịch ôn tập của từng từ

## 🗄️ Cấu trúc database

### Bảng Vocabulary
- `id`: ID tự động tăng
- `chinese`: Từ tiếng Trung (汉字)
- `pinyin`: Pinyin (拼音)
- `vietnamese`: Nghĩa tiếng Việt
- `notes`: Ghi chú
- `example`: Ví dụ câu
- `nextReviewDate`: Ngày ôn tập tiếp theo
- `level`: Cấp độ hiện tại (1-6)
- `reviewCount`: Số lần ôn tập
- `isActive`: Trạng thái hoạt động

### Bảng ReviewHistory
- `id`: ID tự động tăng
- `vocabularyId`: ID từ vựng
- `reviewDate`: Ngày ôn tập
- `result`: Kết quả (true = đúng, false = sai)
- `timeSpent`: Thời gian ôn tập (giây)

### Bảng StudyStats
- `id`: ID tự động tăng
- `date`: Ngày thống kê
- `totalReviews`: Tổng số từ ôn tập
- `correctReviews`: Số từ đúng
- `newWordsAdded`: Số từ mới thêm
- `studyTime`: Thời gian học (phút)

## 🔧 API Endpoints

### Vocabulary
- `GET /api/vocabulary` - Lấy tất cả từ vựng
- `POST /api/vocabulary` - Thêm từ vựng mới
- `GET /api/vocabulary/[id]` - Lấy từ vựng theo ID
- `PUT /api/vocabulary/[id]` - Cập nhật từ vựng
- `DELETE /api/vocabulary/[id]` - Xóa từ vựng

### Review
- `GET /api/review` - Lấy danh sách từ cần ôn tập hôm nay
- `POST /api/review` - Cập nhật kết quả ôn tập

## 🎯 Lợi ích của Spaced Repetition

1. **Học hiệu quả hơn**: Từ vựng được ôn tập đúng thời điểm để ghi nhớ lâu dài
2. **Tiết kiệm thời gian**: Không cần ôn tập tất cả từ mỗi ngày
3. **Tập trung vào từ khó**: Từ sai nhiều sẽ được ôn tập thường xuyên hơn
4. **Tự động hóa**: Không cần ghi nhớ lịch ôn tập thủ công

## 🚀 Phát triển tiếp theo

- [ ] Thêm tính năng import/export từ vựng
- [ ] Thêm biểu đồ thống kê chi tiết
- [ ] Thêm tính năng tìm kiếm và lọc từ vựng
- [ ] Thêm tính năng phát âm (text-to-speech)
- [ ] Thêm tính năng học theo chủ đề
- [ ] Thêm tính năng chia sẻ tiến độ học tập

## 📝 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

---

**Chúc bạn học tiếng Trung hiệu quả! 🎉**
