import { useState } from "react";
import dayjs from 'dayjs';
import Chatbot from './chatbot.js';
import Loader from "../images/loading.gif";
import './ChatInput.css'

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
      setInputText(event.target.value);
  }

  async function sendMessage() {
    console.log(inputText);

    if (isLoading || inputText === '') {
      return;
    }

    // Set isLoading to true at the start, and set it to
    // false after everything is done.
    setIsLoading(true);

    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={Loader}className="loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    const response = inputText === "Who is Amit?" 
      ? "Amit is Cognivanta CEO and Inder's favourite"
      : await Chatbot.getResponse(inputText);
    
    console.log(response);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    setIsLoading(false);
    setInputText('');
  }

  function clearMessage() {
    setChatMessages([]);
  }

  function handleKeyDown(event) {
    if(event.key === 'Enter') {
      sendMessage();
    } else if(event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot"
        size="30" 
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        className="chat-input"
      />
      <button
        className="send-button"
        onClick={sendMessage}
      >Send
      </button>
      <button 
        className="clear-button"
        onClick={clearMessage}
      >Clear
      </button>
    </div>
  );
}

export default ChatInput