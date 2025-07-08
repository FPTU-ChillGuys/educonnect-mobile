import { View, Text } from "react-native";
import React, { useState } from "react";
import { conversationRepository } from "../repository/conversationRepository";

export default function ChatBotHistoryScreen() {

    const conversationIds = useState<String[]>([]);








  const handleGetMessageById = async () => {
    await conversationRepository
      .getAllConversationIdByUserId("33F41895-B601-4AA1-8DC4-8229A9D07008")
      .then((response) => {
            if(response.sucesss){
                
            }

      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
      });
  };

  return (
    <View>
      <Text>ChatBotHistoryScreen</Text>
    </View>
  );
}
