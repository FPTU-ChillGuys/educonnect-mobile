import api from "../services/api";

export const conversationRepository = {
  getConversationsById: (id: string): Promise<any> => {
    return api
      .get(`/conversation/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
        throw error;
      });
  },

  getConversationsByUserId: (id: string): Promise<any> => {
    return api
      .get(`/conversation/user/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
        throw error;
      });
  }
};
