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

  const handleGetMessageById = async () => {
       await conversationRepository
        .getConversationsById("a9e6cf67-2d7e-43e3-7952-08ddb6e6b0f4")
        .then((response) => {
          if (response.success == true) {
            setConversation({
              conversationId: response.data.conversationId,
              messages: new Map<string, MessageProps>(
                response.data.messages.map((msg: any) => [
                  msg.messageId,
                  { role: msg.role, message: msg.content },
                ])
              ),
            });
          } else {
            console.error("Failed to fetch conversation:", response.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching conversation:", error);
        });
    };

  useEffect(() => {
    console.log("ChatBotScreen mounted");
    handleGetMessageById();
  }, []);

  useEffect(() => {
    if (conversation) {
      console.log("Conversation loaded:", conversation);
      conversation.messages.forEach((msg, id) => {
        console.log(`Message ID: ${id}, Role: ${msg.role}, Content: ${msg.message}`);
      });
    }
  }, [conversation]);


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
