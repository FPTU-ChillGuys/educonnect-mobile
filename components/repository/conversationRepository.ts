import api from "../services/api";

export const conversationRepository = {
   getAllConversationIdByUserId: (id: string): Promise<any> => {
    return api
      .get(`/conversation/ids/user/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
        throw error;
      });
  },
};
