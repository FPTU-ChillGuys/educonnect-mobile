import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const days = [
  { id: '14', label: '14', sub: 'Sun' },
  { id: '15', label: '15', sub: 'Mon' },
  { id: '16', label: '16', sub: 'Tue' },
  { id: '17', label: '17', sub: 'Wed' },
  { id: '18', label: '18', sub: 'Thu' },
  { id: '19', label: '19', sub: 'Fri' },
  { id: '20', label: '20', sub: 'Sat' },
];

const timeSlots = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
];

// Demo: lessons theo từng ngày
const lessonsByDay: Record<string, any[]> = {
  '14': [
    { time: '09:00', subject: 'Lí', class: '11A1', color: '#e3f6e3', duration: '09:00 - 10:20' },
  ],
  '15': [
    { time: '07:00', subject: 'Toán', class: '11A1', color: '#e3eaff', duration: '07:00 - 08:30' },
  ],
  '16': [
    { time: '07:00', subject: 'Toán', class: '11A1', color: '#e3eaff', duration: '07:00 - 08:30' },
    { time: '09:00', subject: 'Lí', class: '11A1', color: '#e3f6e3', duration: '09:00 - 10:20' },
  ],
  '17': [
    { time: '10:30', subject: 'Hóa', class: '11A1', color: '#fff9e3', duration: '10:30 - 12:00' },
  ],
  '18': [
    { time: '13:00', subject: 'Anh', class: '11A1', color: '#e3eaff', duration: '13:00 - 14:30' },
  ],
  '19': [],
  '20': [],
};

const { width } = Dimensions.get('window');

const ScheduleScreen = () => {
  const [selectedDay, setSelectedDay] = useState('16');
  const lessons = lessonsByDay[selectedDay] || [];
  const findLesson = (slot: string) => lessons.find(l => l.time === slot);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thời Khóa Biểu</Text>
      </View>
      {/* Week label */}
      <Text style={styles.weekLabel}>Week</Text>
      {/* Days row */}
      <View style={styles.daysRowWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysRow}>
          {days.map((d, idx) => (
            <TouchableOpacity
              key={d.id}
              style={[styles.dayBox, selectedDay === d.id && styles.dayActive]}
              onPress={() => setSelectedDay(d.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.dayLabel, selectedDay === d.id && styles.dayLabelActive]}>{d.label}</Text>
              <Text style={[styles.daySub, selectedDay === d.id && styles.dayLabelActive]}>{d.sub}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Schedule grid */}
      <ScrollView style={styles.gridScroll} contentContainerStyle={{paddingBottom: 24}}>
        {timeSlots.map((slot, idx) => {
          const lesson = findLesson(slot);
          return (
            <View key={slot} style={styles.row}>
              <Text style={styles.timeText}>{slot}</Text>
              {lesson ? (
                <View style={[styles.lessonBox, { backgroundColor: lesson.color, width: width * 0.88 }] }>
                  <Text style={styles.lessonClass}>{lesson.class}</Text>
                  <Text style={styles.lessonSubject}>{lesson.subject}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                    <Ionicons name="time-outline" size={15} color="#8a8a8a" />
                    <Text style={styles.lessonTime}>{lesson.duration}</Text>
                  </View>
                </View>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3578e5',
    height: 56,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  weekLabel: {
    color: '#b0b0b0',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  daysRowWrap: {
    paddingLeft: 8,
    marginBottom: 8,
  },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  dayBox: {
    width: 44,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayActive: {
    backgroundColor: '#3578e5',
  },
  dayLabel: {
    color: '#b0b0b0',
    fontWeight: 'bold',
    fontSize: 17,
  },
  dayLabelActive: {
    color: '#fff',
  },
  daySub: {
    color: '#b0b0b0',
    fontSize: 13,
    marginTop: 2,
  },
  gridScroll: {
    flex: 1,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
    minHeight: 60,
    paddingLeft: 16,
  },
  timeText: {
    color: '#b0b0b0',
    fontSize: 15,
    width: 54,
    marginTop: 8,
    fontWeight: '500',
  },
  lessonBox: {
    marginLeft: 8,
    borderRadius: 14,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    marginBottom: 2,
  },
  lessonClass: {
    color: '#3578e5',
    fontWeight: 'bold',
    fontSize: 15,
  },
  lessonSubject: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 2,
  },
  lessonTime: {
    color: '#8a8a8a',
    fontSize: 15,
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default ScheduleScreen; 