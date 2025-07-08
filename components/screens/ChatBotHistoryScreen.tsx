import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { conversationRepository } from "../repository/conversationRepository";

export default function ChatBotHistoryScreen() {
  const [conversationIds, setConversationId] = useState<String[]>([]);

  const handleGetMessageById = async () => {
    console.log("Fetching conversation IDs...");
    await conversationRepository
      .getAllConversationIdByUserId("33F41895-B601-4AA1-8DC4-8229A9D07008")
      .then((response) => {
        if (response.success) {
         setConversationId(response.data);
         console.log("Conversation IDs fetched successfully:", conversationIds );
        }
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
      });
  };

  useEffect(() => {
    handleGetMessageById();
  }, []);

  return (
    <View>
      <Text>ChatBotHistoryScreen</Text>
    </View>
  );
}
