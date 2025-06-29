import * as signalR from "@microsoft/signalr";

// const connection = new signalR.HubConnectionBuilder()
//                     .withUrl('https://localhost:7231/chatbot')
//                     .build();

type MessageHandler = (
  conversationId: String,
  messageId: String,
  message: String
) => void;

export class SignalRClient {
  private connection: signalR.HubConnection | null = null;
  private messageHandlers: MessageHandler[] = [];

  constructor() {}

  public start() {
    if (this.connection) return;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7231/chatbot")
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
    this.connection
      ?.invoke("SendMessage",userId, conversationId, message)
      .catch((err) => {
        console.error("Error sending message via SignalR:", err);
      });
  }
}
