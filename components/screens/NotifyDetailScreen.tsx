import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotifyDetailScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết tin nhắn</Text>
      </View>
      {/* Content placeholder */}
      <View style={styles.contentBox} />
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
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  contentBox: {
    flex: 1,
    margin: 20,
    borderRadius: 12,
    backgroundColor: '#dedede',
  },
});

export default NotifyDetailScreen; 