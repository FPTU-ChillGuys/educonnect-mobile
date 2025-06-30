import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../styles/theme";
import { conversationRepository } from "../repository/conversationRepository";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import {
  signalRClient,
} from "../services/chatbotServices/signalRClient";

// export interface MessageProps {
//   role: "user" | "assistant";
//   message: string;
// }

export interface ConversationProps {
  conversationId: string;
  messages: IMessage[];
}

enum MessageRole {
  user = 1,
  assistant = 2,
}

const ChatBotScreen = () => {
  const [conversation, setConversation] = useState<ConversationProps>();

  const handler = (messageId: String, message: String) => {
    setConversation((conversation) => {
      if (!conversation) return conversation;
      if (conversation.messages.find((msg) => msg._id == messageId)) {
        streamingChatMessageHandler(messageId, message);
      } else {
        addChatMessageForAssistant(assistantMessage(messageId, message));
      }
    });
  };

  const assistantMessage = (messageId: String, message: String): IMessage => {
    return {
      _id: messageId.toString(),
      text: message.toString(),
      createdAt : new Date(),
      user: {
        _id: MessageRole.assistant, // Assuming user ID 1 for user and 2 for assistant
        name: "Assistant",
      },
    };
  };

  const addChatMessageForAssistant = (message: IMessage) => {
    setConversation((conversation) => {
      if (!conversation) return conversation;
      return {
        conversationId: conversation.conversationId,
        messages: GiftedChat.append(conversation.messages, [message]),
      };
    });
  };

  const streamingChatMessageHandler = (messageId: String, message: String) => {
    let foundMessage = conversation?.messages.find(
      (msg) => msg._id === messageId
    );
    if (foundMessage) {
      foundMessage.text = message.toString();
    }

    setConversation((con) => {
      if (!con) return con;
      return {
        conversationId: con.conversationId,
        messages: con.messages.map((msg) =>
          msg._id === messageId ? { ...msg, text: message.toString() } : msg
        ),
      };
    });
  };

  const handleGetMessageById = async () => {
    await conversationRepository
      .getConversationsById("a9e6cf67-2d7e-43e3-7952-08ddb6e6b0f4")
      .then((response) => {
        if (response.success == true) {
          setConversation({
            conversationId: response.data.conversationId,
            messages: response.data.messages.map((msg: any) => ({
              _id: msg.messageId,
              text: msg.content,
              createdAt: new Date(msg.createdAt),
              // image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              user: {
                _id:
                  msg.role === "User"
                    ? MessageRole.user
                    : MessageRole.assistant, // Assuming user ID 1 for user and 2 for assistant
                name: msg.role === "User" ? "User" : "Assistant",
              },
            })),
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
    }
  }, [conversation]);

  //Them handler
  useEffect(() => {
    signalRClient.subscribe(handler);
    return () => {
      signalRClient.unsubscribe(handler);
    };
  }, []);

  const onSend = useCallback((newMessages: IMessage[]) => {
    console.log("New messages sent:", newMessages);
    setConversation((conversation) => {
      if (!conversation) return conversation;
      return {
        conversationId: conversation.conversationId,
        messages: GiftedChat.append(conversation.messages, newMessages),
      };
    });
    signalRClient.sendMessage(
      newMessages[0].user._id.toString(),
      conversation?.conversationId || "",
      newMessages[0].text
    );
  }, []);

  return (
    <>
      <View className="flex-1 justify-center bg-white mb-20">
        <GiftedChat
          messages={conversation?.messages || []}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: MessageRole.user, // Assuming user ID 1 for the current user
            name: "User",
          }}
          showUserAvatar
          alwaysShowSend
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
