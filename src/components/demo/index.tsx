import React, { useState } from "react";
import ArticleInputModel from "@models/demo/articleInput";
import ChatWidget from "@components/demo/ChatWidget";
import ChatThemeSelector from "@components/demo/ChatThemeSelector";
import ArticleInput from "@components/demo/ArticleInput";

const WIDGET_THEMES = [
  { value: "ChatGPT", label: "ChatGPT" },
  { value: "iMessage", label: "iMessage" }
];

function Demo() {
  const [selectChatTheme, setSelectedChatTheme] = useState(
    WIDGET_THEMES[0].value
  );
  const [zendeskUrl, setZendeskUrl] = useState("");
  const [articleInputObject, setArticleInputObject] =
    useState<ArticleInputModel>();

  return (
    <React.StrictMode>
      <ArticleInput setZendeskUrl={setZendeskUrl} />
      <ChatThemeSelector
        themes={WIDGET_THEMES}
        setTheme={setSelectedChatTheme}
      />
      <ChatWidget
        articleInputObject={articleInputObject}
        setArticleInputObject={setArticleInputObject}
        zendeskUrl={zendeskUrl}
        selectTheme={selectChatTheme}
      />
    </React.StrictMode>
  );
}

export default Demo;
