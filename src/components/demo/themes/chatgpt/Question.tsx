import React from "react";

const Question = ({ onChange, onSubmit }) => {
  return (
    <label htmlFor="userQuestion">
      <div className="md:bg-vert-light-gradient dark:md:bg-vert-dark-gradient absolute bottom-0 left-0 w-full border-t bg-white dark:border-white/20 dark:bg-gray-800 md:border-t-0 md:border-transparent md:!bg-transparent md:dark:border-transparent">
        <form className="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
          <div className="relative flex h-full flex-1 md:flex-col">
            <div className="relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-white py-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 dark:bg-gray-700 dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] md:py-3 md:pl-4">
              <textarea
                id="userQuestion"
                tabIndex={0}
                placeholder="Input your question"
                rows={1}
                className="h-[24px] max-h-[200px] w-full resize-none overflow-y-hidden border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"></textarea>
              <button className="absolute bottom-1.5 right-1 rounded-md p-1 text-gray-500 hover:bg-gray-100 disabled:hover:bg-transparent dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:disabled:hover:bg-transparent md:bottom-2.5 md:right-2">
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
            </div>
          </div>
        </form>
        <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
          Free everything cause we're testing
        </div>
      </div>
    </label>
  );
  // return (
  //   <div className="absolute bottom-0 flex w-full items-center border-t border-gray-300 px-4 pb-2 pt-2">
  //     <input
  //       className="mr-2 flex-1 appearance-none rounded border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //       type="text"
  //       placeholder="iMessage"
  //       value="Input your question"
  //       onChange={onChange}
  //       onKeyDown={(e) => {
  //         if (e.key === "Enter") {
  //           e.preventDefault();
  //           onSubmit();
  //         }
  //       }}
  //     />
  //     <button
  //       className="text-blue-500 hover:text-blue-700 focus:underline focus:outline-none"
  //       onClick={onSubmit}>
  //       Send
  //     </button>
  //   </div>
  // );
};

export default Question;
