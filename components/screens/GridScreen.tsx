import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing } from '../styles/theme';

const GridScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Groupchat</Text>
      <Text style={styles.weekLabel}>Week</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysRow}>
        {/* Days row content */}
      </ScrollView>
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
  },
  weekLabel: {
    color: '#b0b0b0',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 4,
  },
  daysRow: {
    // Add appropriate styles for the days row
  },
  dayBox: {
    // Add appropriate styles for the day box
  },
  dayActive: {
    // Add appropriate styles for the active day
  },
  dayLabel: {
    // Add appropriate styles for the day label
  },
  dayLabelActive: {
    // Add appropriate styles for the active day label
  },
  daySub: {
    // Add appropriate styles for the day sub label
  },
});

export default GridScreen; 