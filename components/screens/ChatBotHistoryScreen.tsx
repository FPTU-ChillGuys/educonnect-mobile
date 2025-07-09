import {
  View,
  Text,
  TouchableOpacity,
  ListRenderItem,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { conversationRepository } from "../repository/conversationRepository";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function ChatBotHistoryScreen({ navigation }: any) {
  const [conversationIdAndTitleList, setConversationIdAndTitleList] = useState<
    { conversationId: string; title: string }[]
  >([]);

  const [searchText, setSearchText] = useState("");

  const filteredConversations = conversationIdAndTitleList.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleGetAllConversationIdAndTitle = async () => {
    console.log("Fetching conversation IDs...");
    await conversationRepository
      .getAllConversationIdByUserId("33F41895-B601-4AA1-8DC4-8229A9D07008")
      .then((response) => {
        if (response.success) {
          setConversationIdAndTitleList(response.data);
          console.log(
            "Conversation IDs fetched successfully:",
            conversationIdAndTitleList
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
      });
  };

  useEffect(() => {
    handleGetAllConversationIdAndTitle();
  }, []);

  const renderHeader = () => (
    <View className="px-4 py-2 bg-white flex-row items-center">
      <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-3 py-2">
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          placeholder="Tìm kiếm"
          placeholderTextColor="#999"
          className="flex-1 ml-2 text-base"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <TouchableOpacity className="ml-3">
        <Ionicons name="arrow-forward" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const renderSectionTitle = () => (
    <Text className="px-4 pt-4 pb-2 text-gray-500 text-sm">
      CUỘC TRÒ CHUYỆN
    </Text>
  );

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <TouchableOpacity
      className="flex-row justify-between items-center px-4 py-2 border-b border-gray-200"
      onPress={() =>
        navigation.navigate("ChatBot", { conversationId: item.conversationId })
      }
    >
      <View className="flex-col">
        <Text className="text-lg text-black">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView className={"flex-1 bg-white"}>
        {renderHeader()}
        {renderSectionTitle()}
        <FlatList
          data={filteredConversations}
          renderItem={renderItem}
          keyExtractor={(id) => id.conversationId}
        />
      </SafeAreaView>
    </>
  );
}
