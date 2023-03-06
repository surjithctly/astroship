import React, { useState } from "react";
import ChatWidget from "@components/demo/ChatWidget";
import WidgetThemeSelector from "@components/demo/widgetThemeSelector";

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
      <WidgetThemeSelector
        themes={WIDGET_THEMES}
        setTheme={setSelectedChatTheme}
      />
      <ChatWidget selectTheme={selectChatTheme} />
    </React.StrictMode>
  );
}
