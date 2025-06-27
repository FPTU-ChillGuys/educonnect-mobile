import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const settingsOptions = [
    { title: 'Thông Tin', subtitle: 'email - sdt', icon: 'user', screen: 'UserInfo' },
    { title: 'Đổi mật khẩu', icon: 'lock', screen: 'ChangePassword' },
    { title: 'Thông báo', subtitle: 'chat - thông báo', icon: 'bell', screen: 'Notifications' },
  ];

  const supportOptions = [
    { title: 'Hỗ Trợ', icon: 'help-circle', screen: 'Support' },
    { title: 'Phản hồi', icon: 'message-square', screen: 'Feedback' },
    { title: 'Thông tin', icon: 'info', screen: 'About' },
  ];

  const renderSettingItem = (item: { title: string; subtitle?: string; icon: any; screen: string; }) => (
    <TouchableOpacity key={item.title} style={styles.optionRow}>
      <View style={styles.iconContainer}>
        <Feather name={item.icon} size={24} color="#fff" />
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{item.title}</Text>
        {item.subtitle && <Text style={styles.optionSubtitle}>{item.subtitle}</Text>}
      </View>
      <Feather name="chevron-right" size={24} color="#A9A9A9" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt</Text>
      </View>
      <ScrollView>
        <View style={styles.topSection}>
            <View style={styles.card} />
        </View>

        <View style={styles.settingsContainer}>
          <View style={styles.section}>
            {settingsOptions.map(renderSettingItem)}
          </View>
          <View style={styles.section}>
            {supportOptions.map(renderSettingItem)}
          </View>
          <TouchableOpacity style={styles.logoutButton}>
             <Feather name="log-out" size={24} color="#4A90E2" />
             <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  topSection: {
    backgroundColor: '#4A90E2',
    paddingBottom: 60,
    paddingHorizontal: 20,
    position: 'relative',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: 100,
    width: '100%',
    marginTop: 10,
    opacity: 0.2
  },
  settingsContainer: {
    padding: 20,
    marginTop: -130,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#A9A9A9',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  logoutButtonText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#4A90E2',
  }
});

export default SettingsScreen; 