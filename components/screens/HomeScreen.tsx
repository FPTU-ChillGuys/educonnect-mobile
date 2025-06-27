import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const features = [
  { icon: <MaterialIcons name="emoji-events" size={32} />, label: 'Bảng điểm' },
  { icon: <MaterialIcons name="show-chart" size={32} />, label: 'Hoạt động' },
  { icon: <MaterialCommunityIcons name="calendar-clock" size={32} />, label: 'Thời khoá biểu' },
  { icon: <FontAwesome5 name="book" size={32} />, label: 'Sổ đầu bài' },
  { icon: <Ionicons name="notifications-outline" size={32} />, label: 'Thông báo' },
  { icon: <MaterialIcons name="chat-bubble-outline" size={32} />, label: 'Nhắn tin' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header xanh */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/60?img=1' }}
          style={styles.parentAvatar}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.helloText}>Xin chào,</Text>
          <Text style={styles.phoneText}>0852630613</Text>
        </View>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Feather name="edit-2" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Card thông tin con */}
      <View style={styles.childCard}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/60?img=2' }}
          style={styles.childAvatar}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.childName}>Lê Phát Đạt</Text>
          <TouchableOpacity>
            <Text style={styles.detailText}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.selectBtn}>
          <Text style={{ color: '#3578e5', fontWeight: 'bold' }}>Chọn con</Text>
        </TouchableOpacity>
      </View>

      {/* Grid features + settings icon */}
      <View style={styles.gridWrap}>
        <View style={styles.grid}>
          {features.map((item, idx) => (
            <View style={styles.gridItem} key={idx}>
              {item.icon}
              <Text style={styles.gridLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  header: {
    backgroundColor: '#3578e5',
    height: 110,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  parentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#fff',
  },
  helloText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400',
  },
  phoneText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  childCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
    marginTop: -28,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 2,
  },
  childAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#3578e5',
  },
  childName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  detailText: {
    color: '#3578e5',
    fontSize: 13,
    marginTop: 2,
  },
  selectBtn: {
    backgroundColor: '#eaf1fb',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginLeft: 8,
  },
  gridWrap: {
    marginTop: 18,
    marginHorizontal: 10,
    position: 'relative',
    paddingTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 38,
    marginHorizontal: 8,
  },
  gridItem: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    elevation: 2,
  },
  gridLabel: {
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center',
  },
}); 