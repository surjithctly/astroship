import React, { useState } from "react";
import ChatWidget from "@components/demo/ChatWidget";
import ChatThemeSelector from "@components/demo/ChatThemeSelector";

const WIDGET_THEMES = [
  { value: "ChatGPT", label: "ChatGPT" },
  { value: "iMessage", label: "iMessage" }
];

export default function ChatWidgetComponent() {
  const [selectChatTheme, setSelectedChatTheme] = useState(
    WIDGET_THEMES[0].value
  );

  return (
    <React.StrictMode>
      <ChatThemeSelector
        themes={WIDGET_THEMES}
        setTheme={setSelectedChatTheme}
      />
      <ChatWidget selectTheme={selectChatTheme} />
    </React.StrictMode>
  );
}
