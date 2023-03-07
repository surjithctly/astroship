import { Tooltip } from "react-tooltip";

function iMessageQuestion({
  question,
  onSubmit,
  setQuestion,
  isValidZendeskUrl
}) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div
      className="relative m-auto flex w-[90%] items-center justify-center bg-black px-4 pb-2 pt-2"
      data-tooltip-content="Please input a valid Zendesk subdomain URL above"
      data-tooltip-place="top"
      data-tooltip-id="my-tooltip">
      <input
        className={`mr-2 w-3/4 appearance-none rounded border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          !isValidZendeskUrl && "cursor-not-allowed"
        }`}
        type="text"
        placeholder="Input your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={!isValidZendeskUrl}
      />
      <button
        className={`text-blue-500 hover:text-blue-700 focus:underline focus:outline-none ${
          !isValidZendeskUrl && "cursor-not-allowed"
        }`}
        onClick={handleSubmit}
        disabled={!isValidZendeskUrl}>
        Send
      </button>
      {!isValidZendeskUrl && <Tooltip id="my-tooltip" />}
    </div>
  );
}

export default iMessageQuestion;
