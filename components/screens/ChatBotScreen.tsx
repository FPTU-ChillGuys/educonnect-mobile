import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../styles/theme";

export interface MessageProps {
  role : "user" | "assistant";
  message : string;
}

export interface ConversationProps {
  conversationId: string;
  messages: Map<string, MessageProps>;
}

const ChatBotScreen = () => {
    const [conversations, setConversations] = useState<ConversationProps>();

  
  return (
    <>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-blue-500">Chatbot</Text>
      </View>
    </>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
  },
  text: {
    fontSize: 20,
    color: colors.dark,
  },
});

export default ChatBotScreen;
