import { useState } from 'react'
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessage';
import './App.css'
			

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
