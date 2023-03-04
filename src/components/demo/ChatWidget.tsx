import { useState, useRef, useEffect } from "react";
import ImessageQuestion from "@components/demo/themes/imessage/question";
import ImessageUserMessage from "@components/demo/themes/imessage/usermessage";
import ImessageAssistantMessage from "@components/demo/themes/imessage/assistantmessage";
import ChatGPTQuestion from "@components/demo/themes/chatgpt/Question";
import ChatGPTUserMessage from "@components/demo/themes/chatgpt/UserMessage";
import ChatGPTAssistantMessage from "@components/demo/themes/chatgpt/AssistantMessage";

type Message = {
  text: string;
  sender: "user" | "assistant";
  sentTime?: string;
};

function HHMM() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function ChatWidget({ selectTheme }): JSX.Element {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  function onSubmit() {
    setMessages([
      ...messages,
      { sender: "user", sentTime: HHMM(), text: question }
    ]);
    setQuestion("");
  }

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (selectTheme === "iMessage") {
    return (
      <div className="relative m-auto mt-6 h-[600px] w-[90%] overflow-scroll rounded-lg border-2 bg-black shadow">
        {messages.map((message, index) => {
          if (message.sender === "user") {
            return (
              <ImessageUserMessage
                key={index}
                text={message.text}
                sentTime={message.sentTime}
              />
            );
          }
          return <ImessageAssistantMessage key={index} text={message.text} />;
        })}
        <ImessageQuestion
          question={question}
          onSubmit={onSubmit}
          setQuestion={setQuestion}
        />
        <div ref={messagesEndRef} />
      </div>
    );
  }

  if (selectTheme === "ChatGPT") {
    return (
      <div className="relative flex h-[600px] flex-col items-center overflow-scroll text-base font-medium dark:bg-[#343541]">
        {messages.map((message, index) => {
          if (message.sender === "user") {
            return (
              <ChatGPTUserMessage
                key={index}
                text={message.text}
                sentTime={message.sentTime}
              />
            );
          }
          return <ChatGPTAssistantMessage key={index} text={message.text} />;
        })}
        <ChatGPTQuestion
          question={question}
          onSubmit={onSubmit}
          setQuestion={setQuestion}
        />
        <div ref={messagesEndRef} />
      </div>
    );
  }

  return (
    <div className="relative m-auto mt-6 h-[600px] w-[90%] rounded-lg border-2 bg-black shadow">
      <p className="text-white">testing!</p>
      {/* {messages.map((message) => {
        if (message.sender === "user") {
          return (
            <iMessageUserMessage text={message.text} sentTime={message.sentTime} />
          );
        }
        return <AssistantMessage text={message.text} />;
      })} */}
      {/* <ImessageQuestion onSubmit={onSubmit} setQuestion={setQuestion} /> */}
    </div>
  );
}

export default ChatWidget;
