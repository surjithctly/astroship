import React, { useState } from "react";
import ChatWidgetComponent from "@components/demo/ChatWidgetComponent";
import ArticleInput from "@components/demo/ArticleInput";

function Demo() {
  const [zendeskUrl, setZendeskUrl] = useState("");

  return (
    <>
      <ArticleInput setZendeskUrl={setZendeskUrl} />
      <ChatWidgetComponent zendeskUrl={zendeskUrl} />
    </>
  );
}

export default Demo;
