import api from "../services/api";

export const messageRepository = {
  getMessagesByConversationId: (id: string): Promise<any> => {
    return api
      .get(`/message/conversation/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
        throw error;
      });
  },

  
};
