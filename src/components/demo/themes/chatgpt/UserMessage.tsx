const Span1Style = {
  display: "inline-block",
  overflow: "hidden",
  width: "initial",
  height: "initial",
  background: "none",
  opacity: "1",
  border: "0px",
  margin: "0px",
  padding: "0px",
  maxWidth: "100%"
};

const Span2Style = {
  display: "block",
  width: "initial",
  height: "initial",
  background: "none",
  opacity: "1",
  border: "0px",
  margin: "0px",
  padding: "0px",
  maxWidth: "100%"
};
function userMessage(props): JSX.Element {
  let formattedTime = props.sentTime;
  if (formattedTime.charAt(0) === "0") {
    formattedTime = formattedTime.slice(1);
  }

  return (
    <div className="w-full border-b border-black/10 border-gray-900/50 bg-[#343541] text-gray-800 text-gray-100">
      <div className="m-auto flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="relative flex w-[30px] flex-col items-end">
          <div className="relative flex">
            <span style={Span1Style}>
              <span style={Span2Style}>
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <rect
                    rx="2"
                    ry="2"
                    x="0"
                    y="0"
                    width="30"
                    height="30"
                    fill="#5485d1"
                  />
                  <text fill="#ffffff" x="30%" y="70%">
                    U
                  </text>
                  {/* <circle cx="15" cy="15" r="10" fill="#2971e3" /> */}
                </svg>
              </span>
            </span>
          </div>
        </div>
        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
          <div className="flex flex-grow flex-col gap-3">
            <div className="flex min-h-[20px] flex-col items-start gap-4 whitespace-pre-wrap">
              {" "}
              {props.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default userMessage;
