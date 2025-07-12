import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Switch, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';
import { RootState } from '../store';
import { jwtDecode } from 'jwt-decode';
import { registerForPushNotificationsAsync } from '../services/notificationHelper';

const BASE_URL = 'http://192.168.1.8:5239/';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      // Fix cứng deviceToken là null
      const deviceToken = null;
      const response: any = await api.post(API_ENDPOINTS.LOGIN, { email, password, deviceToken });
      if (response?.success && response?.data) {
        const { accessToken, refreshToken } = response.data;
        await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        // Giải mã token lấy userId từ claim nameidentifier
        let userId = '';
        try {
          const decoded: any = jwtDecode(accessToken);
          userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || '';
        } catch (e) {
          dispatch(loginFailure('Token không hợp lệ'));
          return;
        }
        if (!userId) {
          dispatch(loginFailure('Không tìm thấy userId trong token!'));
          return;
        }
        try {
          const userProfile = await api.get(`user/${userId}`);
          // Lấy danh sách children
          let children: any[] = [];
          try {
            const childrenRes = await api.get(`student/parent/${userId}/childrens`);
            console.log('API childrenRes:', childrenRes.data);
            children = Array.isArray(childrenRes.data) ? childrenRes.data : (childrenRes.data?.data || []);
            console.log('Children after API:', children);
          } catch (e) {
            // Nếu lỗi vẫn tiếp tục, children sẽ là []
          }
          dispatch(loginSuccess({ user: userProfile.data, token: accessToken, children }));
          navigation.navigate('ProfileMain' as never);
        } catch (e: any) {
          dispatch(loginFailure(e?.response?.data?.message || 'Không lấy được thông tin người dùng!'));
        }
      } else {
        const errorMsg = response?.message === 'User not found'
          ? 'Tài khoản không tồn tại'
          : response?.message || 'Đăng nhập thất bại';
        dispatch(loginFailure(errorMsg));
      }
    } catch (err: any) {
      let msg = 'Đăng nhập thất bại';
      if (err?.response?.data?.message) {
        msg = err.response.data.message;
      } else if (typeof err?.response?.data === 'string') {
        msg = err.response.data;
      } else if (err?.message) {
        msg = err.message;
      }
      dispatch(loginFailure(msg));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>EduConnect</Text>
      <Text style={styles.subtitle}>Đăng Nhập</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#B0C4DE"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật Khẩu"
        placeholderTextColor="#B0C4DE"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.optionsContainer}>
        <View style={styles.rememberMeContainer}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={rememberMe ? "#f5dd4b" : "#f4f3f4"}
          />
          <Text style={styles.rememberMeText}>Ghi nhớ</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
          <Text style={styles.forgotPasswordText}>Quên Mật Khẩu?</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={{ color: 'yellow', marginBottom: 10 }}>{error}</Text>}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
        <Text style={styles.loginButtonText}>{isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    color: '#fff',
    marginLeft: 8,
  },
  forgotPasswordText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen; 