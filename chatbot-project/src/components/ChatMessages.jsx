import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import './ChatMessages.css'

function useAutoScroll(dependencies) {
  const containerRef  = useRef(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      // make the container down to bottom
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return containerRef;
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);

  const chatMessageComponents = chatMessages.map((chatMessage) => {
    return (
      <ChatMessage
        message={chatMessage.message}
        sender={chatMessage.sender}
        key={chatMessage.id} 
      />
    );
  })

  
  return(
    <div 
      className="chat-messages-container"
      ref={chatMessagesRef}
    >
      {chatMessageComponents}
    </div>	
  );

  
}

export default ChatMessages