import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../styles/theme";
import { conversationRepository } from "../repository/conversationRepository";

export interface MessageProps {
  role: "user" | "assistant";
  message: string;
}

export interface ConversationProps {
  conversationId: string;
  messages: Map<string, MessageProps>;
}

const ChatBotScreen = () => {
  const [conversation, setConversation] = useState<ConversationProps>();

  useEffect(() => {
    conversationRepository
      .getConversationsByUserId("33F41895-B601-4AA1-8DC4-8229A9D07008")
      .then((response) => {
          if (response.success == true){
            setConversation({
              conversationId: response.data.conversationId,
              messages: new Map<string, MessageProps>(response.data.messages.map((msg: any) => [msg.messageId, { role: msg.role, message: msg.message }]))
            })
          } else {
            console.error("Failed to fetch conversation:", response.message);
          }
          console.log(conversation);
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
      });
  }, []);

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
