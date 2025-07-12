import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../store/slices/notificationSlice';
import { RootState } from '../store';
import { registerForPushNotificationsAsync } from '../services/notificationHelper';

const BOT_ICON = require('../../assets/BOT.png');

const BookmarksScreen = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.notification) as { title: string | null; body: string | null };
  const navigation = useNavigation();
  const [deviceToken, setDeviceToken] = useState('');

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notificationObj => {
      let { title, body } = notificationObj.request.content;
      if (title == null) title = '';
      if (body == null) body = '';
      dispatch(setNotification({ title, body }));
    });
    return () => subscription.remove();
  }, [dispatch]);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) setDeviceToken(token);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông báo</Text>
      </View>
      {/* Search bar */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#aaa" style={{ marginLeft: 8 }} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#aaa"
          style={styles.input}
        />
      </View>
      {/* Notification list */}
      {notification.title ? (
        <TouchableOpacity onPress={() => (navigation as any).navigate('NotifyDetail', { body: notification.body || '' })}>
          <View style={styles.notifyItem}>
            <Image source={BOT_ICON} style={styles.notifyIcon} />
            <Text style={styles.notifyText}>{notification.title || ''}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      {/* Device Token */}
      {deviceToken ? (
        <View style={{ backgroundColor: '#fff', margin: 12, padding: 10, borderRadius: 8 }}>
          <Text style={{ fontSize: 13, color: '#3578e5', fontWeight: 'bold' }}>Device Token:</Text>
          <Text selectable style={{ fontSize: 12, color: '#222' }}>{deviceToken}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3578e5',
    height: 56,
    paddingHorizontal: 12,
    paddingTop: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 16,
    height: 36,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#222',
  },
  notifyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  notifyIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
    resizeMode: 'contain',
  },
  notifyText: {
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    fontSize: 14,
  },
  placeholder: {
    height: 44,
    borderRadius: 6,
    backgroundColor: '#dedede',
    marginBottom: 12,
  },
});

export default BookmarksScreen; 