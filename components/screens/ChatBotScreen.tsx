import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../styles/theme";
import { conversationRepository } from "../repository/conversationRepository";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { signalRClient } from "../services/chatbotServices/signalRClient";
import { messageRepository } from "../repository/messageRepository";
import Markdown from "react-native-markdown-display";
import uuid from "react-native-uuid";
import { NAVIGATION } from "../utils/constants";

// export interface MessageProps {
//   role: "user" | "assistant";
//   message: string;
// }

// export interface ConversationProps {
//   conversationId: string;
//   messages: IMessage[];
// }

enum MessageRole {
  user = 1,
  assistant = 2,
}

const ChatBotScreen = ({ route, navigation }: any) => {
  const [messages, setMessages] = useState<IMessage[]>();
  // const [conversationId, setConversationId] = useState<String>();
  const [userId, setUserId] = useState<String>(
    "33F41895-B601-4AA1-8DC4-8229A9D07008"
  );

  const conversationId =
    route?.params?.conversationId != undefined
      ? route?.params?.conversationId
      : uuid.v4().toString();

  useEffect(() => {
    console.log("Conversation ID set to:", conversationId);
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.push(NAVIGATION.CHATBOTHISTORY)}
        >
          <Text style={{ marginLeft: 15 }}>☰</Text>
        </TouchableOpacity>
      ),
      ...(messages && messages.length > 0
        ? {
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.replace(NAVIGATION.CHATBOT, {
                    conversationId: uuid.v4(), // Generate a new conversation ID
                  })
                }
              >
                <Ionicons
                  name="chatbubbles"
                  size={24}
                  color={colors.primary}
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
          }
        : {}),
    });
  }, [navigation, messages]);

  // Handler for incoming messages from SignalR
  const handler = (messageId: String, message: String) => {
    console.log(
      "SignalR message received with ID:",
      messageId,
      "and text:",
      message
    );
    setMessages((messages) => {
      if (!messages) {
        return messages;
      }
      if (messages.find((msg) => msg._id == messageId)) {
        return streamingChatMessageHandler(messageId, message, messages);
      } else {
        return addChatMessageForAssistant(
          assistantMessage(messageId, message),
          messages
        );
      }
    });
  };

  // Function to create an assistant message
  const assistantMessage = (messageId: String, message: String): IMessage => {
    console.log(
      "Creating assistant message with ID:",
      messageId ?? "",
      "and text:",
      message ?? ""
    );
    return {
      _id: messageId.toString(),
      text: message?.toString(),
      createdAt: new Date(),
      user: {
        _id: MessageRole.assistant, // Assuming user ID 1 for user and 2 for assistant
        name: "Assistant",
      },
    };
  };

  // Function to add a chat message for the assistant
  const addChatMessageForAssistant = (
    message: IMessage,
    messages: IMessage[]
  ) => {
    if (!messages) {
      console.log("No conversation found, returning empty conversation.");
    }
    const appendedChat = GiftedChat.append(messages, [message]);
    return appendedChat.map((msg) => {
      if (msg._id === message._id) {
        return { ...msg, text: message.text?.toString() ?? "" };
      }
      return msg;
    });
  };

  // Handler for streaming chat messages
  const streamingChatMessageHandler = (
    messageId: String,
    message: String,
    messages: IMessage[]
  ) => {
    let foundMessage = messages?.find((msg) => msg._id === messageId);
    if (foundMessage) {
      if (message !== undefined) {
        foundMessage.text = message?.toString();
      } else {
        console.log("Message text is undefined in here!");
      }
    }
    if (!messages) {
      return messages;
    }
    return messages.map((msg) =>
      msg._id === messageId
        ? {
            ...msg,
            text: foundMessage?.text ? foundMessage.text.toString() : "",
          }
        : msg
    );
  };

  // Fetch messages by conversation ID
  const handleGetMessageById = async () => {
    console.log("Fetching messages for conversation ID:", conversationId);
    await messageRepository
      .getMessagesByConversationId(conversationId)
      .then((response) => {
        if (response.success == true) {
          setMessages(
            response.data.map((msg: any) => ({
              _id: msg.messageId,
              text: msg.content,
              createdAt: new Date(msg.createdAt),
              // image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              user: {
                _id: msg.role === "User" ? userId : MessageRole.assistant, // Assuming user ID 1 for user and 2 for assistant
                name: msg.role === "User" ? "User" : "Assistant",
              },
            }))
          );
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

  // useEffect(() => {
  //   if (messages) {
  //     console.log("Conversation loaded:", messages);
  //   }
  // }, [messages]);

  //Them handler
  useEffect(() => {
    console.log("Subscribing to SignalR messages");
    signalRClient.subscribe(handler);
    return () => {
      console.log("Unscribing from SignalR messages");
      signalRClient.unsubscribe(handler);
    };
  }, []);

  // Function to handle sending messages
  const onSend = useCallback((newMessages: IMessage[]) => {
    setMessages((messages) => {
      if (!messages) return messages;
      return GiftedChat.append(messages, newMessages);
    });
    signalRClient.sendMessage(
      newMessages[0].user._id?.toString(),
      conversationId,
      newMessages[0].text
    );
  }, []);

  return (
    <>
      <View className="flex-1 justify-center bg-white mb-20">
        <GiftedChat
          messages={messages || []}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: userId?.toString(), // Assuming user ID 1 for the current user
            name: "User",
          }}
          showUserAvatar
          alwaysShowSend
          renderMessageText={(props) => (
            <Markdown>{props.currentMessage.text || ""}</Markdown>
          )}
        />
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
