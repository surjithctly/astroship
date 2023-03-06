export default class ChatMessage {
  public text: string;
  public sender: "user" | "assistant";
  public sentTime?: string;

  constructor({ text, sender, sentTime }: ChatMessage) {
    this.text = text;
    this.sender = sender;
    if (sentTime) {
      this.sentTime = sentTime;
    }
  }

  static createSentTimeField() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
}
