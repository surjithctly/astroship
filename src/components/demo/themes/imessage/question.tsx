import React from "react";

const iMessageQuestion = ({ onChange, onSubmit }) => {
  return (
    <div className="absolute bottom-0 flex w-full items-center border-t border-gray-300 px-4 pb-2 pt-2">
      <input
        className="mr-2 flex-1 appearance-none rounded border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="iMessage"
        value="Input your question"
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
      <button
        className="text-blue-500 hover:text-blue-700 focus:underline focus:outline-none"
        onClick={onSubmit}>
        Send
      </button>
    </div>
  );
};

export default iMessageQuestion;
