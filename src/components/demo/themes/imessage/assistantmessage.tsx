function iMessageAssistantMessage({ text }): JSX.Element {
  return (
    <div className="flex items-end">
      <div className="mx-2 my-1 max-w-[43%]">
        <div className="rounded-lg bg-gray-600 p-2 font-medium text-white">
          <p className="">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default iMessageAssistantMessage;
