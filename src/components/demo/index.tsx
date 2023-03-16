import { useState, useEffect } from "react";
import ArticleInputModel from "@models/demo/articleInput";
import ChatWidget from "@components/demo/ChatWidget";
import ChatThemeSelector from "@components/demo/ChatThemeSelector";
import ArticleInput from "@components/demo/ArticleInput";
import Notice from "@components/demo/Notice";

const WIDGET_THEMES = [
  { value: "ChatGPT", label: "ChatGPT" },
  { value: "iMessage", label: "iMessage" }
];

function Demo() {
  const [selectChatTheme, setSelectedChatTheme] = useState(
    WIDGET_THEMES[0].value
  );
  const [zendeskUrl, setZendeskUrl] = useState("");
  const [isValidZendeskUrl, setIsValidZendeskUrl] = useState(false);
  const [articleInputObject, setArticleInputObject] =
    useState<ArticleInputModel>();

  useEffect(() => {
    setIsValidZendeskUrl(false);
    if (zendeskUrl) {
      const articleInputValue = new ArticleInputModel(zendeskUrl);
      if (articleInputValue.isInputUrlValid()) {
        setArticleInputObject(articleInputValue);
        setIsValidZendeskUrl(true);
      }
    }
  }, [zendeskUrl]);

  // hack to get around free tier limits
  useEffect(() => {
    fetch("https://wiselydesk-backend.onrender.com");
  });

  return (
    <>
      <Notice />
      <ArticleInput
        isValidZendeskUrl={isValidZendeskUrl}
        setZendeskUrl={setZendeskUrl}
      />
      <ChatThemeSelector
        themes={WIDGET_THEMES}
        setTheme={setSelectedChatTheme}
      />
      <ChatWidget
        articleInputObject={articleInputObject}
        selectTheme={selectChatTheme}
        isValidZendeskUrl={isValidZendeskUrl}
      />
    </>
  );
}

export default Demo;
