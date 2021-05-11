import React, { useContext } from "react";
import "./Chat.css";
import { SocketContext } from "../../SocketContext";

export const Chat = () => {
  const { me, message, messages, setMessage, sendMessage } = useContext(SocketContext);

  const handleChange = (e) => {
    setMessage(e.currentTarget.value);
  }

  return (
    <div className="chat_main_container">
      <div className='chat_list_messages'>
        <h3>Chat</h3>
      {messages.map((message, index) => {
        if (message.id === me) {
          return (
           <div key={index} className="my_own_message"> {message.body} </div>
          )
        }
        return (
          <div key={index} className="friend_message"> {message.body} </div>
        )
      })}
      </div>
      <form onSubmit={sendMessage}>
        <div className="chat_block">
          <input
            className='messages_input'
            value={message}
            onChange={handleChange}
            placeholder="Type your message"
          />
        </div>
        <button type="submit" className="btn_message_send">Send message</button>
      </form>
    </div>
  );
};
