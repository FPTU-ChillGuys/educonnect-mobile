import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

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

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Đăng Nhập</Text>
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