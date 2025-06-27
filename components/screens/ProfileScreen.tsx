import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../styles/theme';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

const ProfileScreen = ({ navigation }: any) => {
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
          <View style={styles.buttonContainer}>
            <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
          </View>
          <Button title="Logout" onPress={handleLogout} color={colors.danger} />
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
  buttonContainer: {
    marginBottom: spacing.md,
    width: '100%',
  },
});

export default ProfileScreen; 