import dayjs from 'dayjs';
import RobotProfileImage from "../images/bot.png";
import UserProfileImage from "../images/user.png";
import './ChatMessage.css'

function ChatMessage(props) {
  console.log(props)
  
  const { message, sender, time } = props;

  return(
    <div className={
      sender === 'user'
      ? 'chat-message-user' 
      : 'chat-message-robot'
    }>
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
        {time && (
          <div className='chat-message-time'>
            {dayjs(time).format('h:mma')}
          </div>
        )}
      </div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}

export default ChatMessage