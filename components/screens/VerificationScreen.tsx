import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const VerificationScreen = () => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>EduConnect</Text>
      <Text style={styles.subtitle}>Xác Thực</Text>
      
      <Text style={styles.label}>Nhập mã xác thực</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        placeholderTextColor="#B0C4DE"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Không nhận được mã! </Text>
        <TouchableOpacity>
          <Text style={styles.resendLink}>Gửi lại</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Xác nhận</Text>
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
    marginBottom: 15,
    fontSize: 16,
  },
  resendContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  resendText: {
    color: '#fff',
  },
  resendLink: {
    color: '#fff',
    fontWeight: 'bold',
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

export default VerificationScreen; 