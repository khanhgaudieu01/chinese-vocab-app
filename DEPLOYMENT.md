# 🚀 Hướng dẫn Deploy ứng dụng học từ vựng tiếng Trung

## 📋 Tổng quan

Ứng dụng này có thể được deploy lên nhiều nền tảng khác nhau để có thể truy cập từ điện thoại và laptop.

## 🎯 Các tùy chọn deploy

### 1. Vercel (Khuyến nghị - Miễn phí)

#### Bước 1: Tạo tài khoản Vercel
- Truy cập: https://vercel.com
- Đăng ký tài khoản (có thể dùng GitHub)

#### Bước 2: Tạo database
- Vào Vercel Dashboard
- Chọn "Storage" → "Create Database"
- Chọn "Postgres"
- Ghi nhớ connection string

#### Bước 3: Deploy ứng dụng
```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login vào Vercel
vercel login

# Deploy
vercel

# Hoặc deploy production
vercel --prod
```

#### Bước 4: Cấu hình Environment Variables
- Vào project settings trên Vercel
- Thêm `DATABASE_URL` với connection string từ bước 2

### 2. Railway (Dễ sử dụng)

#### Bước 1: Tạo tài khoản Railway
- Truy cập: https://railway.app
- Đăng ký tài khoản

#### Bước 2: Deploy
- Kết nối GitHub repository
- Railway sẽ tự động detect Next.js
- Thêm PostgreSQL database từ Railway

#### Bước 3: Cấu hình
- Railway sẽ tự động set `DATABASE_URL`
- Deploy sẽ tự động chạy

### 3. Render (Free tier tốt)

#### Bước 1: Tạo tài khoản Render
- Truy cập: https://render.com
- Đăng ký tài khoản

#### Bước 2: Deploy
- Connect GitHub repository
- Chọn "Web Service"
- Cấu hình:
  - Build Command: `npm run build`
  - Start Command: `npm start`

#### Bước 3: Thêm database
- Tạo PostgreSQL database
- Copy connection string vào Environment Variables

## 🔧 Cấu hình Database

### PostgreSQL Connection String Format:
```
postgresql://username:password@host:port/database
```

### Ví dụ:
```
postgresql://postgres:mypassword@localhost:5432/chinese_vocab
```

## 📱 Truy cập từ điện thoại

Sau khi deploy thành công, bạn sẽ có URL như:
- Vercel: `https://your-app.vercel.app`
- Railway: `https://your-app.railway.app`
- Render: `https://your-app.onrender.com`

### Truy cập từ điện thoại:
1. Mở trình duyệt trên điện thoại
2. Nhập URL của ứng dụng
3. Sử dụng bình thường như trên laptop

## 🔒 Bảo mật

### Environment Variables cần thiết:
```bash
DATABASE_URL=postgresql://...
NODE_ENV=production
```

### Không commit file .env:
- Đảm bảo `.env` trong `.gitignore`
- Chỉ set environment variables trên platform

## 📊 Monitoring

### Vercel:
- Analytics tự động
- Performance monitoring
- Error tracking

### Railway:
- Logs real-time
- Resource usage
- Auto-scaling

### Render:
- Health checks
- Logs
- Performance metrics

## 🚨 Troubleshooting

### Lỗi thường gặp:

1. **Database connection failed**
   - Kiểm tra `DATABASE_URL`
   - Đảm bảo database đã được tạo

2. **Build failed**
   - Kiểm tra logs
   - Đảm bảo tất cả dependencies đã cài

3. **App không load**
   - Kiểm tra environment variables
   - Xem logs để debug

## 📈 Scaling

### Khi có nhiều người dùng:
- Upgrade database plan
- Enable caching
- Optimize queries

### Performance tips:
- Sử dụng CDN
- Enable compression
- Optimize images

## 🎉 Kết quả

Sau khi deploy thành công:
- ✅ Truy cập được từ mọi thiết bị
- ✅ Dữ liệu được đồng bộ real-time
- ✅ Backup tự động
- ✅ SSL certificate tự động
- ✅ Performance tốt

---

**Chúc bạn deploy thành công! 🚀** 