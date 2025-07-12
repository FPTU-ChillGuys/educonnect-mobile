import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../styles/theme';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { getFcmToken, logDeviceInfo, getDetailedDeviceInfo, getAllDeviceTokens } from '../services/notificationHelper';

const ProfileScreen = ({ navigation }: any) => {
  // Lấy user từ store
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [deviceToken, setDeviceToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      console.log('🔄 ProfileScreen: Bắt đầu lấy FCM token...');
      logDeviceInfo();
      const token = await getFcmToken();
      setDeviceToken(token || 'Không lấy được token');
      console.log('🔄 ProfileScreen: Kết thúc lấy FCM token');
    };
    getToken();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  const copyDeviceToken = () => {
    if (deviceToken && deviceToken !== 'Không lấy được token') {
      Alert.alert('Device Token', `Token đã được copy: ${deviceToken}`);
      // Trong thực tế bạn có thể sử dụng Clipboard API để copy
    } else {
      Alert.alert('Lỗi', 'Không có device token để copy');
    }
  };

  const testGetDeviceToken = async () => {
    const token = await getFcmToken();
    if (token) {
      setDeviceToken(token);
      Alert.alert('Thành công', 'Đã lấy được FCM token mới!');
    } else {
      Alert.alert('Lỗi', 'Không thể lấy FCM token');
    }
  };

  const testDeviceInfo = async () => {
    await logDeviceInfo();
    Alert.alert('Device Info', 'Đã log thông tin device vào console');
  };

  const testDetailedDeviceInfo = async () => {
    const deviceInfo = await getDetailedDeviceInfo();
    Alert.alert('Detailed Device Info', `Device ID: ${deviceInfo.deviceId}\nAndroid ID: ${deviceInfo.androidId}`);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          {/* Header card */}
          <View style={styles.headerCard}>
            <Image
              source={user.avatar ? { uri: user.avatar } : require('../../assets/icon.png')}
              style={styles.avatar}
            />
            <View style={styles.headerInfo}>
              <Text style={styles.headerName}>{user.fullName ? user.fullName : (user.name || 'tên')}</Text>
              <Text style={styles.headerEmail}>{user.email || 'yourname@gmail.com'}</Text>
            </View>
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="pencil" size={18} color="#4A90E2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Đổi thông tin</Text>
            </TouchableOpacity>
          </View>

          {/* Thông tin chi tiết */}
          <View style={styles.infoSection}>
            <Text style={styles.label}>Họ và Tên :</Text>
            <Text style={styles.value}>{user.fullName ? user.fullName : (user.name || '')}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email || ''}</Text>
            <Text style={styles.label}>số điện thoại</Text>
            <Text style={styles.value}>{user.phoneNumber ? user.phoneNumber : '+084......'}</Text>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{user.location ? user.location : ''}</Text>
            <Text style={styles.label}>Device Token</Text>
            <Text style={styles.deviceTokenValue}>{deviceToken}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyDeviceToken}>
              <Text style={styles.copyButtonText}>Copy Token</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.testButton} onPress={testGetDeviceToken}>
              <Text style={styles.testButtonText}>Test Get Token</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deviceInfoButton} onPress={testDeviceInfo}>
              <Text style={styles.deviceInfoButtonText}>Device Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deviceInfoButton} onPress={testDetailedDeviceInfo}>
              <Text style={styles.deviceInfoButtonText}>Detailed Device Info</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.deviceInfoButton} 
              onPress={() => navigation.navigate('DeviceInfo')}
            >
              <Text style={styles.deviceInfoButtonText}>Device Info Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.deviceInfoButton} 
              onPress={async () => {
                const tokens = await getAllDeviceTokens();
                Alert.alert('Firebase Tokens', `FCM Token: ${tokens.fcmToken}\nDevice ID: ${tokens.deviceId}`);
              }}
            >
              <Text style={styles.deviceInfoButtonText}>Firebase Tokens</Text>
            </TouchableOpacity>
          </View>
          {/* Nút Đăng xuất */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.text}>Please login to view profile</Text>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        
          <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
  },
  headerCard: {
    backgroundColor: '#3578E5',
    margin: 16,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    backgroundColor: '#fff',
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerEmail: {
    fontSize: 14,
    color: '#fff',
    marginTop: 2,
  },
  editIcon: {
    position: 'absolute',
    top: 12,
    right: 60,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
  },
  editButton: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    elevation: 2,
  },
  editButtonText: {
    color: '#3578E5',
    fontWeight: 'bold',
    fontSize: 13,
  },
  infoSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 18,
    marginTop: 8,
  },
  label: {
    color: '#888',
    fontSize: 14,
    marginTop: 10,
  },
  value: {
    color: '#222',
    fontSize: 16,
    marginBottom: 2,
    marginTop: 2,
  },
  deviceTokenValue: {
    color: '#222',
    fontSize: 12,
    marginBottom: 2,
    marginTop: 2,
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 20,
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  email: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    marginBottom: spacing.md,
    width: '100%',
  },
  logoutButton: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 2,
  },
  logoutButtonText: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 16,
  },
  copyButton: {
    backgroundColor: '#4CAF50',
    marginTop: 8,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  testButton: {
    backgroundColor: '#2196F3',
    marginTop: 8,
    marginLeft: 8,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  testButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  deviceInfoButton: {
    backgroundColor: '#FF9800',
    marginTop: 8,
    marginLeft: 8,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  deviceInfoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ProfileScreen; 