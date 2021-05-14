import React, { useContext } from "react";
import "./Chat.css";
import { SocketContext } from "../../SocketContext";
import {InputComponent} from '../Input/InputComponent'
import { ButtonComponent } from '../Button/ButtonComponent'

export const Chat = () => {
  
  const { me, messages, sendMessage, setMessage, message } = useContext(SocketContext);

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
        <InputComponent placeholder="Type your message" className='messages_input' value={message}  onChange={handleChange} />
        <ButtonComponent type="submit" className="btn_message_send"> {'Send message'} </ButtonComponent>
      </form>
    </div>
  );
};
