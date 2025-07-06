import * as signalR from "@microsoft/signalr";

// const connection = new signalR.HubConnectionBuilder()
//                     .withUrl('https://localhost:7231/chatbot')
//                     .build();

type MessageHandler = (
  conversationId: String,
  messageId: String,
  message: String
) => void;

class SignalRClient {
  private connection: signalR.HubConnection | null = null;
  private messageHandlers: MessageHandler[] = [];

  constructor() {}

  public start() {
    if (this.connection?.state === signalR.HubConnectionState.Connected) return;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://10.0.2.2:5269/chatbot")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.on(
      "ReceiveMessage",
      (conversationId: String, messageId: String, message: String) => {
        this.messageHandlers.forEach((handler) =>
          handler(conversationId, messageId, message)
        );
      }
    );

    this.connection
      .start()
      .then(() => console.log("SignalR connection started."))
      .catch((err) => {
        console.error("Error starting SignalR connection:", err);
      });
  }

  public stop() {
    this.connection?.stop();
    this.connection = null;
  }

  public subscribe(handler: MessageHandler) {
    this.messageHandlers.push(handler);
    if (
      !this.connection ||
      this.connection.state !== signalR.HubConnectionState.Connected
    ) {
      this.start();
    }
  }

  public unsubscribe(handler: MessageHandler) {
    this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    if (this.messageHandlers.length === 0 && this.connection) {
      this.stop();
    }
  }

  public sendMessage(userId : String, conversationId: String, message: String) {
    if ((this.connection?.state === signalR.HubConnectionState.Disconnected) || this.connection === null || this.connection === undefined) {
      console.log("SignalR connection not established, starting connection...");
      this.start();
    }
    this.connection
      ?.invoke("SendMessageAsync",userId, conversationId, message)
      .catch((err) => {
        console.error("Error sending message via SignalR:", err);
      });
  }
}

export const signalRClient = new SignalRClient();
