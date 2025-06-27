import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const notifications = [
  {
    id: '1',
    title: 'Thông báo : học sinh Nguyễn Văn Bình vắng mặt hôm 30/4',
    icon: require('../../assets/BOT.png'),
  },
  { id: '2', placeholder: true },
  { id: '3', placeholder: true },
  { id: '4', placeholder: true },
  { id: '5', placeholder: true },
];

const BookmarksScreen = () => {
  const navigation: any = useNavigation();
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
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) =>
          item.placeholder ? (
            <View style={styles.placeholder} />
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('NotifyDetail')}>
              <View style={styles.notifyItem}>
                <Image source={item.icon} style={styles.notifyIcon} />
                <Text style={styles.notifyText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )
        }
      />
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