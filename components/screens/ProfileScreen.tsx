import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors, spacing } from '../styles/theme';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

const ProfileScreen = () => {
  // Lấy user từ store
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.text}>Welcome, {user.name}!</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Button title="Logout" onPress={handleLogout} color={colors.danger} />
        </>
      ) : (
        <Text style={styles.text}>Please login to view profile</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
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
});

export default ProfileScreen; 