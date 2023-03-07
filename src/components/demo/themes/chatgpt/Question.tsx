import * as ReactToolTip from "react-tooltip";

function Question({ onSubmit, setQuestion, question, isValidZendeskUrl }) {
  function handleEnterBtn(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const textArea = e.target as HTMLTextAreaElement;
      setQuestion(textArea.value);
      onSubmit();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <label htmlFor="userQuestion">
      <div
        className="flex w-full border-t dark:border-white/20 dark:bg-[#343541] md:border-t-0 md:border-transparent md:dark:border-transparent"
        data-tooltip-content="Please input a valid Zendesk subdomain URL above"
        data-tooltip-place="top"
        data-tooltip-id="my-tooltip">
        <form
          className="stretch mx-2 flex w-[80%] flex-row gap-3 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6"
          onSubmit={handleSubmit}
          onKeyDown={handleEnterBtn}>
          <div className="relative flex h-full flex-1 md:flex-col">
            <div className="relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-white py-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 dark:bg-gray-700 dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] md:py-3 md:pl-4">
              <textarea
                id="userQuestion"
                tabIndex={0}
                value={question}
                placeholder="Input your question"
                rows={1}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={!isValidZendeskUrl}
                className={`h-[24px] max-h-[200px] w-full resize-none overflow-y-hidden border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0 ${
                  !isValidZendeskUrl && "cursor-not-allowed"
                }`}></textarea>
              <button
                className={`absolute bottom-1.5 right-1 rounded-md p-1 text-gray-500 hover:bg-gray-100 disabled:hover:bg-transparent dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:disabled:hover:bg-transparent md:bottom-2.5 md:right-2 ${
                  !isValidZendeskUrl && "cursor-not-allowed"
                }`}
                onClick={handleSubmit}
                disabled={!isValidZendeskUrl}
                type="submit">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 h-4 w-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
              {!isValidZendeskUrl && <ReactToolTip.Tooltip id="my-tooltip" />}
            </div>
          </div>
        </form>
      </div>
    </label>
  );
}

export default Question;
