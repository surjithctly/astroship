import ChatMessage from "@models/demo/chatMessage";

type ChatGptMessage = {
  role: "user" | "assistant";
  content: string;
};

export function convertChatMessageToChatGPT(
  messages: ChatMessage[]
): ChatGptMessage[] {
  return messages.map((message) => {
    return {
      role: message.sender,
      content: message.text
    };
  });
}
