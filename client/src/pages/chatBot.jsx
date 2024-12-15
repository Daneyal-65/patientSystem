import React, { useEffect, useState } from "react";
import Ai from "../model/gemni";

const ChatBot = () => {
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");
  const [chats, setChats] = useState([]);
  const handleChatbotResponse = async (query) => {
    const res = await Ai(query);
    setChats((pre) => [...pre, res]);
  };
  const handleClick = () => {
    if (query.length > 0) {
      setChats((pre) => [...pre, query]);
      const prompt = query;
      handleChatbotResponse(prompt);
    }
    setQuery("");
  };
  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        document.getElementById("yourButtonId").click();
      }
    });
  });
  return (
    <div>
      <div className="fixed bottom-5 right-5 bg-red-600 rounded-full shadow-2xl animate-bounce overflow-hidden z-30">
        <button
          className="font-black text-white text-xl p-3 hover:bg-blue-700 transition"
          onClick={() => setActive(!active)}
        >
          ChatBot
        </button>
      </div>
      {active && (
        <div
          className="flex justify-center items-center flex-col h-screen w-full absolute inset-0 
           bg-black opacity-100 gap-4 z-60"
        >
          <ul
            className="w-[23rem] p-4 md:w-[30rem] rounded-md px-6 shadow-2xl overflow-scroll max-h-[500px] 
          mt-24 bg-[#eae5e5] hide-scroll my-10 min-h-[400px]"
          >
            <li className="text-xl text-pretty underline font-black">
              Chat With Ai Docter
            </li>
            {chats.map((chat, indx) => (
              <li
                key={chat + indx}
                className={`text-xl mt-4
                  text-wrap break-words 
                  font-bold font-serif w-full flex ${
                    indx % 2 === 0
                      ? "justify-end items-end "
                      : "justify-start items-start "
                  }`}
              >
                <span
                  className={`${
                    indx % 2 === 0
                      ? "bg-white shadow-md border-[1px] border-green-200"
                      : "bg-green-300 shadow-md"
                  } px-3 py-1 rounded-lg text-md`}
                >
                  {chat}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center w-[23rem] md:w-[30rem] bg-white shadow-2xl rounded-full p-2">
            <input
              type="text"
              placeholder="Ask a question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow outline-none px-4 py-2 text-lg rounded-l-full border-none"
            />
            <button
              className="bg-blue-500 text-white px-6 py-2 text-lg font-semibold rounded-full hover:bg-blue-600 transition"
              onClick={handleClick}
              id="yourButtonId"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
