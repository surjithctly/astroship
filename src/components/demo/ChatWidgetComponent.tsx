import React, { useState } from "react";
import ChatWidget from "@components/demo/ChatWidget";
import ChatThemeSelector from "@components/demo/ChatThemeSelector";

const WIDGET_THEMES = [
  { value: "ChatGPT", label: "ChatGPT" },
  { value: "iMessage", label: "iMessage" }
];

export default function ChatWidgetComponent({
  zendeskUrl
}: {
  zendeskUrl: string;
}) {
  const [selectChatTheme, setSelectedChatTheme] = useState(
    WIDGET_THEMES[0].value
  );

  return (
    <React.StrictMode>
      <ChatThemeSelector
        themes={WIDGET_THEMES}
        setTheme={setSelectedChatTheme}
      />
      <ChatWidget zendeskUrl={zendeskUrl} selectTheme={selectChatTheme} />
    </React.StrictMode>
  );
}
