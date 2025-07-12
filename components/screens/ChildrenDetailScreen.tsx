import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { RootState } from '../store';

const ChildrenDetailScreen = ({ route }: any) => {
  const { child } = route.params;
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin học sinh</Text>
      <Text style={styles.label}>Họ và tên:</Text>
      <Text style={styles.value}>{child.fullName}</Text>
      <Text style={styles.label}>Mã học sinh:</Text>
      <Text style={styles.value}>{child.studentCode}</Text>
      <Text style={styles.label}>Giới tính:</Text>
      <Text style={styles.value}>{child.gender}</Text>
      <Text style={styles.label}>Ngày sinh:</Text>
      <Text style={styles.value}>{child.dateOfBirth}</Text>
      <Text style={styles.label}>Lớp:</Text>
      <Text style={styles.value}>{child.className}</Text>
      <Text style={styles.label}>Email phụ huynh:</Text>
      <Text style={styles.value}>{user?.email  || 'Chưa cập nhật'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#3578e5',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    color: '#222',
  },
  value: {
    fontSize: 16,
    color: '#444',
    marginTop: 2,
  },
});

export default ChildrenDetailScreen; 