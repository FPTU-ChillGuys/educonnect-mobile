import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../styles/theme";
import { conversationRepository } from "../repository/conversationRepository";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { signalRClient } from "../services/chatbotServices/signalRClient";
import { messageRepository } from "../repository/messageRepository";
import Markdown from "react-native-markdown-display";

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

const ChatBotScreen = ({route} : any) => {
  const [messages, setMessages] = useState<IMessage[]>();
  const [conversationId, setConversationId] = useState<String>(
    "a9e6cf67-2d7e-43e3-7952-08ddb6e6b0f4"
  );
  const [userId, setUserId] = useState<String>(
    "33F41895-B601-4AA1-8DC4-8229A9D07008"
  );

  
  useEffect(() => {
      setConversationId(route?.params?.conversationId ?? conversationId);
      console.log("Conversation ID set to:", route?.params?.conversationId);
  }, []);
  

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

  const handleGetMessageById = async () => {
    await messageRepository
      .getMessagesByConversationId(route?.params?.conversationId ?? conversationId)
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

  const onSend = useCallback((newMessages: IMessage[]) => {
    setMessages((messages) => {
      if (!messages) return messages;
      return GiftedChat.append(messages, newMessages);
    });
    signalRClient.sendMessage(
      newMessages[0].user._id?.toString(),
      conversationId?.toString() ?? "",
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
