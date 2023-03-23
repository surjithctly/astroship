function assistantMessage({
  assistantResponseFinished,
  text,
  isNotLastAssistanceMessage
}): JSX.Element {
  return (
    <div className="w-full border-b  border-gray-900/50  bg-[#444654] text-gray-100">
      <div className="m-auto flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="relative flex w-[30px] flex-col items-end">
          <div className="relative flex h-[30px] w-[30px] items-center justify-center rounded-sm bg-white p-1 text-white">
            <svg
              viewBox="0 0 100 100"
              strokeWidth="1.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              <path
                d="M10,10 L30,90 L50,50 L70,90 L90,10"
                stroke="black"
                stroke-width="10"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
          <div className="flex flex-grow flex-col gap-3">
            <div className="flex min-h-[20px] flex-col items-start gap-4 whitespace-pre-wrap ">
              <div className="prose prose-invert w-full break-words ">
                <p
                  className={`${
                    assistantResponseFinished || isNotLastAssistanceMessage
                      ? ""
                      : "!last:after:mt-1 last:after:animate-assistant-message last:after:bg-white last:after:text-white last:after:content-['▋']"
                  }`}>
                  {text}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="visible mt-2 flex justify-center gap-3 self-end text-gray-400 md:gap-4 lg:absolute lg:top-0 lg:right-0 lg:mt-0 lg:translate-x-full lg:gap-1 lg:self-center lg:pl-2">
              <button className="rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-gray-200 disabled:hover:text-gray-400">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </button>
              <button className="rounded-md p-1 text-gray-400 hover:bg-gray-700  hover:text-gray-200 disabled:hover:text-gray-400">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default assistantMessage;
