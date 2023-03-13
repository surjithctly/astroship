import { useState, useRef, useEffect } from "react";
import ImessageQuestion from "@components/demo/themes/imessage/question";
import ImessageUserMessage from "@components/demo/themes/imessage/usermessage";
import ImessageAssistantMessage from "@components/demo/themes/imessage/assistantmessage";
import ChatGPTQuestion from "@components/demo/themes/chatgpt/Question";
import ChatGPTUserMessage from "@components/demo/themes/chatgpt/UserMessage";
import ChatGPTAssistantMessage from "@components/demo/themes/chatgpt/AssistantMessage";
import ChatMessage from "@models/demo/chatMessage";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { convertChatMessageToChatGPT } from "@dto/openai";

function ChatWidget({
  selectTheme,
  articleInputObject,
  isValidZendeskUrl
}): JSX.Element {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [assistantStreamingResponse, setAssistantStreamingResponse] =
    useState("");
  const [assistantResponseFinished, setAssistantResponseFinished] =
    useState(false);

  async function onSubmit() {
    setAssistantResponseFinished(false);
    const updatedMessages = [
      ...messages,
      new ChatMessage({
        sender: "user",
        sentTime: ChatMessage.createSentTimeField(),
        text: question
      })
    ];

    setMessages([
      ...updatedMessages,
      new ChatMessage({ sender: "assistant", text: "" }) // send empty response to mimic chatGPT
    ]);
    setQuestion("");

    fetchEventSource(
      "http://127.0.0.1:5000/landingPage/articleIngestor/conversation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question,
          subdomain: articleInputObject.subdomain,
          article_id: articleInputObject.articleId,
          messages: convertChatMessageToChatGPT(updatedMessages)
        }),
        onmessage(mes) {
          const newStreamingResponse =
            assistantStreamingResponse + JSON.parse(mes.data).text;
          setAssistantStreamingResponse((a) => a + newStreamingResponse);
        },
        onclose() {
          setAssistantStreamingResponse("");
          setAssistantResponseFinished(true);
          throw new Error("Hack to close SSE connection client side", {
            cause: "hack"
          }); // hack to close the connection
        },
        onerror() {
          setAssistantStreamingResponse("");
          setAssistantResponseFinished(true);
          throw new Error("Hack to close SSE connection client side", {
            cause: "hack"
          }); // hack to close the connection
        }
      }
    ).catch((e) => {
      if (e.cause === "hack") {
        console.log(e);
        // do nothing
        return;
      }
      throw new Error(e);
    });
  }

  useEffect(() => {
    if (assistantResponseFinished === true) {
      return;
    }

    // stream the assistant answer
    if (messages.length > 0) {
      const lastAssistantAnswer = messages.slice(-1)[0];
      lastAssistantAnswer.text = assistantStreamingResponse;
      setMessages([
        ...messages.slice(0, messages.length - 1),
        lastAssistantAnswer
      ]);
    }
  }, [assistantStreamingResponse]);

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
        <div className="relative m-auto mt-6 h-[66vh] min-h-[400px] w-[90%] overflow-scroll rounded-t-lg bg-black pb-2 shadow">
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
          isValidZendeskUrl={isValidZendeskUrl}
        />
      </>
    );
  }

  return (
    <>
      <div className="relative flex h-[66vh] min-h-[400px] flex-col items-center overflow-scroll text-base font-medium dark:bg-[#343541]">
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
          return (
            <ChatGPTAssistantMessage
              assistantResponseFinished={assistantResponseFinished}
              key={index}
              text={message.text}
            />
          );
        })}

        <div ref={messagesEndRef} />
      </div>
      <ChatGPTQuestion
        question={question}
        onSubmit={onSubmit}
        setQuestion={setQuestion}
        isValidZendeskUrl={isValidZendeskUrl}
      />
    </>
  );
}

export default ChatWidget;
