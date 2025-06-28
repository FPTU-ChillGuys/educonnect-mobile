import api from "../services/api";

export class conversationRepository {
  getConversationsById(id: String): Promise<any> {
    return api
      .get(`/conversation/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
        throw error;
      });
  }

    getConversationsByUserId(id: String): Promise<any> {
    return api
      .get(`/conversation/user/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
        throw error;
      });
  }
}
