import React, { useState } from "react";
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

const baseUserMessage: Message = {
  text: "Hey, how are you?",
  sender: "user",
  sentTime: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })
};

const baseAssistantMessage: Message = {
  text: "Good, thank you.",
  sender: "assistant"
};

const baseUserMessage2: Message = {
  text: "Doing good thank you so much for asking. I'm just wondering what is the weather in Berlin today?",
  sender: "user",
  sentTime: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })
};

const baseAssistantMessage2: Message = {
  text: "It should be cloudy because it is winter and that is classic winter weather for Berlin. Sorry about that.",
  sender: "assistant"
};

function ChatWidget({ selectTheme }): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([
    baseUserMessage,
    baseAssistantMessage,
    baseUserMessage2,
    baseAssistantMessage2
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    // setMessages([...messages, { text: message, sender: "user" }]);
  };

  function onChange() {
    console.log("changed");
  }

  function onSubmit() {
    console.log("submitted");
  }

  if (selectTheme === "iMessage") {
    return (
      <div className="relative m-auto mt-6 h-[600px] w-[90%] rounded-lg border-2 bg-black shadow">
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
        <ImessageQuestion onChange={onChange} onSubmit={onSubmit} />
      </div>
    );
  }

  if (selectTheme === "ChatGPT") {
    return (
      <div className="relative flex h-[600px] flex-col items-center text-base font-medium dark:bg-gray-800">
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
        <ChatGPTQuestion onChange={onChange} onSubmit={onSubmit} />
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
      <ImessageQuestion onChange={onChange} onSubmit={onSubmit} />
    </div>
  );
}

export default ChatWidget;
