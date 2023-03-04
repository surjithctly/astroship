import React, { useState, useEffect } from "react";
import ChatWidget from "@components/demo/NewChatWidget";
import WidgetThemeSelector from "@components/demo/widgetThemeSelector";

const WIDGET_THEMES = [
  { value: "iMessage", label: "iMessage" },
  { value: "ChatGPT", label: "ChatGPT" }
];

export default function ChatWidgetComponent() {
  const [selectChatTheme, setSelectedChatTheme] = useState(
    WIDGET_THEMES[1].value
  );

  // handle SSR and hydration correctly
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <>
      <WidgetThemeSelector
        themes={WIDGET_THEMES}
        setTheme={setSelectedChatTheme}
      />
      <ChatWidget selectTheme={selectChatTheme} />
    </>
  );
}
