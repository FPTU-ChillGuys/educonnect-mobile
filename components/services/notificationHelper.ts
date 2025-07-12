import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import * as Device from 'expo-device';
import * as Application from 'expo-application';

// Kiểm tra Firebase Messaging có sẵn không
function isFirebaseMessagingAvailable() {
  try {
    return messaging !== null && messaging !== undefined;
  } catch (error) {
    console.log('❌ Firebase Messaging not available:', error);
    return false;
  }
}

// Xin quyền thông báo
export async function requestNotificationPermission() {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      console.log('🔐 Android notification permission:', granted);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  } catch (error) {
    console.error('❌ Error requesting notification permission:', error);
    return false;
  }
}

// Lấy FCM Token
export async function getFcmToken() {
  try {
    if (!isFirebaseMessagingAvailable()) {
      console.log('❌ Firebase Messaging not available');
      return null;
    }
      
    console.log('🚀 Bắt đầu lấy FCM Token...');
    
    // Xin quyền trước
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.log('❌ Không được cấp quyền thông báo!');
      Alert.alert('Thông báo', 'Cần quyền thông báo để nhận push notifications');
      return null;
    }
    
    // Lấy FCM Token thực sự
    const token = await messaging().getToken();
    console.log('🎯 === FCM TOKEN ===');
    console.log('📱 Token:', token);
    console.log('🎯 =================');
    
    return token;
  } catch (error) {
    console.error('💥 Failed to get FCM Token:', error);
    return null;
  }
}

// Lắng nghe tin nhắn khi app đang mở (foreground)
export function listenForegroundMessage() {
  try {
    if (!isFirebaseMessagingAvailable()) {
      console.log('❌ Firebase Messaging not available for foreground messages');
      return () => {};
    }

    console.log('📨 Setting up foreground message listener...');
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('📨 Foreground message received:', remoteMessage);
      // Xử lý tin nhắn ở đây
    });

    return unsubscribe;
  } catch (error) {
    console.log('❌ Error setting up foreground message listener:', error);
    return () => {};
  }
}

// Đăng ký background handler (cần gọi trong index.js)
export function setupBackgroundHandler() {
  try {
    if (!isFirebaseMessagingAvailable()) {
      console.log('❌ Firebase Messaging not available for background handler');
      return;
    }

    // Tạm thời không setup vì Firebase bị disable
    console.log('📨 Background handler: DISABLED');
  } catch (error) {
    console.log('❌ Error setting up background handler:', error);
  }
}

// Lấy tất cả device tokens (FCM + Device Info)
export async function getAllDeviceTokens() {
  const tokens: {
    fcmToken: string | null;
    deviceId: string | null;
    androidId: string | null;
    bundleId: string | null;
    isEmulator: boolean;
  } = {
    fcmToken: null,
    deviceId: null,
    androidId: null,
    bundleId: null,
    isEmulator: !Device.isDevice,
  };

  try {
    console.log('🔍 Đang lấy tất cả device tokens...');
    
    // 1. FCM Token
    tokens.fcmToken = await getFcmToken();

    // 2. Device ID
    tokens.deviceId = await getDeviceId();

    // 3. Android ID
    try {
      tokens.androidId = await Application.getAndroidId();
    } catch (error) {
      console.log('❌ Không thể lấy Android ID:', error);
    }

    // 4. Bundle ID
    tokens.bundleId = Application.applicationId;

    console.log('📱 === ALL DEVICE TOKENS ===');
    console.log(JSON.stringify(tokens, null, 2));
    console.log('📱 === END ALL TOKENS ===');

    return tokens;
  } catch (error) {
    console.log('💥 Lỗi khi lấy tất cả tokens:', error);
    return tokens;
  }
}

// Giữ lại các function cũ để tương thích
export async function registerForPushNotificationsAsync() {
  console.log('⚠️ registerForPushNotificationsAsync is deprecated, use getFcmToken instead');
  return await getFcmToken();
}

export async function getDeviceToken() {
  console.log('⚠️ getDeviceToken is deprecated, use getFcmToken instead');
  return await getFcmToken();
}

export async function logDeviceInfo() {
  console.log('📱 === DEVICE INFO ===');
  console.log('🔧 isDevice:', Device.isDevice);
  console.log('📱 Platform:', Device.platformApiLevel);
  console.log('📱 Brand:', Device.brand);
  console.log('📱 Model:', Device.modelName);
  console.log('📱 OS Version:', Device.osVersion);
  console.log('📱 Device ID:', await getDeviceId());
  console.log('📱 Android ID:', await Application.getAndroidId());
  console.log('📱 Bundle ID:', Application.applicationId);
  console.log('📱 === END DEVICE INFO ===');
}

export async function getDeviceId(): Promise<string> {
  try {
    // Sử dụng Android ID cho Android
    if (Device.osName === 'Android') {
      return await Application.getAndroidId() || 'unknown';
    }
    // Sử dụng Installation ID cho iOS
    else if (Device.osName === 'iOS') {
      return Application.applicationId || 'unknown';
    }
    return 'unknown';
  } catch (error) {
    console.log('❌ Error getting device ID:', error);
    return 'error';
  }
}

export async function getDetailedDeviceInfo() {
  const deviceInfo = {
    isDevice: Device.isDevice,
    platform: Device.platformApiLevel,
    brand: Device.brand,
    model: Device.modelName,
    osVersion: Device.osVersion,
    osName: Device.osName,
    deviceId: await getDeviceId(),
    androidId: await Application.getAndroidId(),
    bundleId: Application.applicationId,
    appVersion: Application.nativeApplicationVersion,
    buildVersion: Application.nativeBuildVersion,
  };
  
  console.log('📱 === DETAILED DEVICE INFO ===');
  console.log(JSON.stringify(deviceInfo, null, 2));
  console.log('📱 === END DETAILED DEVICE INFO ===');
  
  return deviceInfo;
} 