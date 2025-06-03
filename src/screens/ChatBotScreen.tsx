import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/theme';

const ChatBotScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chat Bot</Text>
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
});

export default ChatBotScreen; 