import api from "../services/api";

export const conversationRepository = {
   getAllConversationIdByUserId: (id: string): Promise<any> => {
    return api
      .get(`/conversation/ids/user/${id}`)
      .then((response) => {
        console.log("Fetched conversation IDs:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
        throw error;
      });
  },
};
