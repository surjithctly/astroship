function iMessageUserMessage(props): JSX.Element {
  let formattedTime = props.sentTime;
  if (formattedTime.charAt(0) === "0") {
    formattedTime = formattedTime.slice(1);
  }

  return (
    <div className="flex items-end justify-end">
      <div className="mx-2 my-1 max-w-[43%] first:my-2">
        <div className="rounded-lg bg-blue-600 p-2 font-medium text-white">
          <p className="">{props.text}</p>
        </div>
        <div className="mt-1 flex justify-end">
          <p className="absolute text-xs text-gray-400">{formattedTime}</p>
        </div>
      </div>
    </div>
  );
}

export default iMessageUserMessage;
