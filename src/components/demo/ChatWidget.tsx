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
import ArticleInput from "@models/demo/articleInput";

function ChatWidget({
  selectTheme,
  articleInputObject,
  isValidZendeskUrl,
  shouldFocusQuestion
}: {
  selectTheme: string;
  articleInputObject: ArticleInput | undefined;
  isValidZendeskUrl: boolean;
  shouldFocusQuestion: boolean;
}): JSX.Element {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [assistantStreamingResponse, setAssistantStreamingResponse] =
    useState("");
  const [assistantResponseFinished, setAssistantResponseFinished] =
    useState(false);

  function clearStreamingResponse() {
    setAssistantStreamingResponse("");
    setAssistantResponseFinished(true);
  }

  const url = import.meta.env.DEV
    ? "http://localhost:5000"
    : "https://wiselydesk-backend.onrender.com/";
  const organization = articleInputObject?.getOrganization();

  async function onSubmit() {
    const updatedMessages = [
      ...messages,
      new ChatMessage({
        sender: "user",
        sentTime: ChatMessage.createSentTimeField(),
        text: question
      })
    ];

    // send empty response to indicate to user that a reply is coming
    setMessages([
      ...updatedMessages,
      new ChatMessage({ sender: "assistant", text: "" })
    ]);
    setAssistantResponseFinished(false);
    setQuestion("");

    const controller = new AbortController();
    fetchEventSource(`${url}/landingPage/articleIngestor/conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question,
        subdomain: organization,
        article_id: articleInputObject?.articleId,
        messages: convertChatMessageToChatGPT(updatedMessages),
        secret: import.meta.env.PUBLIC_SECRET_API_KEY
      }),
      signal: controller.signal,
      async onopen() {
        console.log("Opened SSE connection");
        if (assistantResponseFinished) {
          setAssistantResponseFinished(false);
        }
      },
      onmessage(mes) {
        const event = mes.event as string | undefined;
        if (event === "closing_connection") {
          console.log("Server has no more messages. Closing SSE connection.");
          clearStreamingResponse();
          return controller.abort();
        }

        const data = JSON.parse(mes.data);
        let lastMessage = data.text as string | undefined;
        if (lastMessage?.includes("<NEWLINE>")) {
          lastMessage = lastMessage.replaceAll("<NEWLINE>", "\n");
        }
        const newStreamingResponse = assistantStreamingResponse + lastMessage;
        setAssistantStreamingResponse((a) => a + newStreamingResponse);
      },
      onclose() {
        console.log("Closing SSE connection");
        clearStreamingResponse();
        controller.abort();
      },
      onerror(e) {
        console.error(e);
        clearStreamingResponse();
        throw new Error("Hack to close SSE connection client side", {
          cause: "hack"
        }); // hack to close the connection
      }
    }).catch((e) => {
      if (e.cause === "hack") {
        console.error("Cause error from hack with SSE");
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
    if (messages.length > 0 && assistantStreamingResponse) {
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
      <div
        className={`relative flex h-[66vh] min-h-[400px] flex-col items-center overflow-scroll bg-[#343541] text-base font-medium ${
          assistantResponseFinished
            ? ""
            : "last:after:ml-1 last:after:animate-assistant-message last:after:bg-white last:after:text-white last:after:content-['▋']"
        }
      `}>
        {messages.map((message, index) => {
          const isNotLastMessage = messages.length !== index + 1;
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
              isNotLastAssistanceMessage={isNotLastMessage}
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
        shouldFocusQuestion={shouldFocusQuestion}
      />
    </>
  );
}

export default ChatWidget;
