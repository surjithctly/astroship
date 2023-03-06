import { useState, useRef, useEffect } from "react";
import ImessageQuestion from "@components/demo/themes/imessage/question";
import ImessageUserMessage from "@components/demo/themes/imessage/usermessage";
import ImessageAssistantMessage from "@components/demo/themes/imessage/assistantmessage";
import ChatGPTQuestion from "@components/demo/themes/chatgpt/Question";
import ChatGPTUserMessage from "@components/demo/themes/chatgpt/UserMessage";
import ChatGPTAssistantMessage from "@components/demo/themes/chatgpt/AssistantMessage";
import { postData } from "@clients/fetch";
import { getHHMM } from "@utils/index";

type Message = {
  text: string;
  sender: string;
  sentTime?: string;
};

type Messages = (
  | Message
  | { sender: string; sentTime: string; text: string }
)[];

type AiResponseDTO = {
  ai_answer: {
    sender: string;
    text: string;
  };
};

function ChatWidget({ selectTheme }): JSX.Element {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Messages>([]);

  async function onSubmit() {
    const updatedMessages = [
      ...messages,
      { sender: "user", sentTime: getHHMM(), text: question }
    ];

    // Add the user message to the chat
    setMessages(updatedMessages);
    setQuestion("");

    const res = await postData<AiResponseDTO>(
      "http://127.0.0.1:5000/landingPage/articleIngestor/chat/ultimateai/4401884334994",
      {
        question
      }
    );

    // Add the AI response to the chat
    setMessages([...updatedMessages, res.ai_answer]);
  }

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = (
    ref: React.MutableRefObject<HTMLDivElement | null>
  ) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  };

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  if (selectTheme === "iMessage") {
    return (
      <>
        <div className="relative m-auto mt-6 h-[66vh] w-[90%] overflow-scroll rounded-t-lg bg-black pb-2 shadow">
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

          <div ref={messagesEndRef} />
        </div>
        <ImessageQuestion
          question={question}
          onSubmit={onSubmit}
          setQuestion={setQuestion}
        />
      </>
    );
  }

  return (
    <>
      <div className="relative flex h-[66vh] flex-col items-center overflow-scroll text-base font-medium dark:bg-[#343541]">
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

        <div ref={messagesEndRef} />
      </div>
      <ChatGPTQuestion
        question={question}
        onSubmit={onSubmit}
        setQuestion={setQuestion}
      />
    </>
  );
}

export default ChatWidget;
