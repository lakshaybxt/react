import RobotProfileImage from "../images/bot.png";
import UserProfileImage from "../images/user.png";
import './ChatMessage.css'

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
        <img src={RobotProfileImage} alt="bot" className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === "user" && (
        <img src={UserProfileImage} alt="user" className="chat-message-profile" />
      )}
    </div>
  );
}

export default ChatMessage