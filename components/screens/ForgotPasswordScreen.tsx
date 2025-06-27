import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>EduConnect</Text>
      <Text style={styles.subtitle}>Quên Mật Khẩu</Text>
      
      <Text style={styles.label}>Nhập địa chỉ Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Example@gmail.com"
        placeholderTextColor="#B0C4DE"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Gửi mã</Text>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
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
    alignSelf: 'flex-start'
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen; 