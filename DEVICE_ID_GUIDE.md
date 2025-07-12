# Hướng Dẫn Lấy Device ID và SHA1 Fingerprint

## 📱 Cách Lấy Device ID Trên Thiết Bị Giả Lập

### Phương Pháp 1: Sử Dụng App (Khuyến Nghị)

1. **Chạy ứng dụng trên thiết bị giả lập:**
   ```bash
   npm start
   # Hoặc
   npx expo start
   ```

2. **Mở ứng dụng và vào Profile Screen**

3. **Nhấn "Device Info Screen"** để xem thông tin chi tiết

4. **Copy Device ID hoặc Android ID** để sử dụng

### Phương Pháp 2: Sử Dụng Console Log

1. **Mở Developer Tools** (F12 hoặc Ctrl+Shift+I)

2. **Vào tab Console**

3. **Nhấn "Device Info"** trong app

4. **Xem log** để lấy thông tin device

## 🔑 Cách Lấy SHA1 Fingerprint Cho Firebase

### Phương Pháp 1: Sử Dụng Script (Khuyến Nghị)

```bash
npm run get-sha1
```

### Phương Pháp 2: Sử Dụng EAS CLI

```bash
npx eas credentials --platform android
```

### Phương Pháp 3: Sử Dụng Keytool (Cần Java)

```bash
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

### Phương Pháp 4: Sử Dụng Android Studio

1. Mở Android Studio
2. Vào **Gradle** tab
3. Chạy task: `android:signingReport`
4. Xem SHA1 trong output

## 📋 Thông Tin Cần Thiết

### Device ID Types:
- **Device ID**: Duy nhất cho mỗi thiết bị
- **Android ID**: Thay đổi khi reset factory
- **Installation ID**: Duy nhất cho mỗi cài đặt app

### SHA1 Types:
- **Debug SHA1**: Cho development và testing
- **Release SHA1**: Cho production app
- **Upload SHA1**: Cho Play Store (nếu có)

## 🔧 Thêm Vào Firebase Console

1. **Vào Firebase Console**
2. **Chọn Project Settings**
3. **Chọn tab "Your apps"**
4. **Chọn app Android**
5. **Thêm SHA1 fingerprint**

## 📝 Lưu Ý Quan Trọng

- **Device ID** và **Android ID** là duy nhất cho mỗi thiết bị
- **SHA1** cần thiết để Firebase Authentication hoạt động
- **Debug SHA1** dùng cho development
- **Release SHA1** dùng cho production

## 🚀 Troubleshooting

### Lỗi "keytool not found":
- Cài đặt Java JDK
- Thêm Java vào PATH
- Hoặc sử dụng `npx eas credentials`

### Lỗi "keystore not found":
- Chạy `npx expo run:android` để tạo keystore
- Hoặc sử dụng EAS Build

### Lỗi "Device ID unknown":
- Kiểm tra quyền truy cập
- Chạy trên thiết bị thật thay vì simulator 