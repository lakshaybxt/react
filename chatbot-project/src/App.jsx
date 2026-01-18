import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import './App.css'

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
							id: crypto.randomUUID()
						}
					];

					setChatMessages([
						...newChatMessages,
						{
							message: <img src="../images/loading-spinner.gif" className="loading-spinner" />,
							sender: 'robot',
							id: crypto.randomUUID()
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
							id: crypto.randomUUID()
						}
					]);

 					setIsLoading(false);
					setInputText('');
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
					</div>
				);
			}

			function ChatMessage(props) {
				console.log(props)
				// const message = props.message;
				// const sender = props.sender;
				const { message, sender } = props;

				/*
				if (sender === "robot") {
					return(
						<div>
							<img src="../images/bot.png" width="50px"/>
							{message}
						</div>
					);

				}
				*/

				return(
					<div className={
						sender === 'user'
						? 'chat-message-user' 
						: 'chat-message-robot'
					}>
						{sender === "robot" && (
							<img src="../images/bot.png" className="chat-message-profile" />
						)}
						<div className="chat-message-text">
							{message}
						</div>
						{sender === "user" && (
							<img src="../images/user.png" className="chat-message-profile" />
						)}
					</div>
				);
			}

			function useAutoScroll(dependencies) {
				const containerRef  = useRef(null);

				useEffect(() => {
					const containerElem = containerRef.current;
					if (containerElem) {
						// make the container down to bottom
						containerElem.scrollTop = containerElem.scrollHeight;
					}
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


  function App() {
    
    const array = useState([
      /*{
      message: 'hello chatbot',
      sender: 'user',
      id: 'id1'
    },
    {
      message: 'Hello! How can I help you?',
      sender: 'robot',
      id: 'id2'
    },
    {
      message: `Can you get me today's date?`,
      sender: 'user',
      id: 'id3'
    },
    {
      message: 'Today is January 8',
      sender: 'robot',
      id: 'id4'
    }*/
  ]);

    const [chatMessages, setChatMessages] = array;
    // const chatMessages = array[0];
    // const setChatMessages = array[1];
    

  return(
      <div className="app-container">
        {chatMessages.length === 0 && (
          <p className="welcome-message">
            Welcome to the chatbot project! Send a message using the textbox below.
          </p>
        )}
        <ChatMessages
            chatMessages={chatMessages}
        />
        <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
        />
      </div>	
    );
  }

export default App
