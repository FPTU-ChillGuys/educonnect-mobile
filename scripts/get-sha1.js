#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔍 Tìm kiếm keystore files...\n');

// Các đường dẫn có thể chứa keystore
const possiblePaths = [
  path.join(process.env.USERPROFILE || process.env.HOME, '.android', 'debug.keystore'),
  path.join(process.cwd(), 'android', 'app', 'debug.keystore'),
  path.join(process.cwd(), 'android', 'debug.keystore'),
];

let keystorePath = null;

// Tìm keystore file
for (const keystore of possiblePaths) {
  if (fs.existsSync(keystore)) {
    keystorePath = keystore;
    console.log(`✅ Tìm thấy keystore tại: ${keystore}`);
    break;
  }
}

if (!keystorePath) {
  console.log('❌ Không tìm thấy keystore file');
  console.log('\n📝 Các đường dẫn đã kiểm tra:');
  possiblePaths.forEach(p => console.log(`   - ${p}`));
  console.log('\n💡 Hướng dẫn:');
  console.log('   1. Chạy "npx expo run:android" để tạo keystore');
  console.log('   2. Hoặc sử dụng "npx eas credentials" để xem thông tin');
  process.exit(1);
}

try {
  console.log('\n🔑 Đang lấy thông tin SHA1...\n');
  
  // Lệnh keytool để lấy SHA1
  const command = `keytool -list -v -keystore "${keystorePath}" -alias androiddebugkey -storepass android -keypass android`;
  
  const output = execSync(command, { encoding: 'utf8' });
  
  // Tìm SHA1 trong output
  const sha1Match = output.match(/SHA1:\s*([A-F0-9:]+)/i);
  const md5Match = output.match(/MD5:\s*([A-F0-9:]+)/i);
  
  console.log('📋 Thông tin keystore:');
  console.log('========================');
  
  if (sha1Match) {
    console.log(`🔑 SHA1: ${sha1Match[1]}`);
    console.log(`📋 Copy SHA1 này để thêm vào Firebase Console`);
  }
  
  if (md5Match) {
    console.log(`🔑 MD5: ${md5Match[1]}`);
  }
  
  console.log('\n📝 Hướng dẫn thêm vào Firebase:');
  console.log('   1. Vào Firebase Console');
  console.log('   2. Chọn Project Settings');
  console.log('   3. Chọn tab "Your apps"');
  console.log('   4. Chọn app Android');
  console.log('   5. Thêm SHA1 fingerprint');
  
} catch (error) {
  console.log('❌ Lỗi khi lấy SHA1:', error.message);
  console.log('\n💡 Có thể bạn cần:');
  console.log('   1. Cài đặt Java JDK');
  console.log('   2. Thêm Java vào PATH');
  console.log('   3. Hoặc sử dụng "npx eas credentials" thay thế');
} 