import React, { useContext, useRef, useEffect, useState } from 'react'
import './Chat.css'
import { SocketContext } from '../../SocketContext'
import { io } from 'socket.io-client'

export const Chat = () => {
    
    const {me, name, setName} = useContext(SocketContext)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    
    const socketRef = useRef()
    
    useEffect(() => {
        socketRef.current = io.connect('/')

        socketRef.current.on('name', name => {
            setName(name)
        })

        socketRef.current.on('message', (message) => {
            getMessages(message)
        })
    }, [setName])

    // chat and messages
    //---------------------
    const getMessages = (message) => {
        setMessages(messages =>  [messages, ...message])
    }
    const sendMessage = (e) => {
        e.preventDefault()
        const messageData = {body: message, id: me}
        setMessage('')
        socketRef.current.emit('sendChatMessage', messageData)
    }

    const handleChange = (e) => {
        setMessage(e.currentTarget.value)
    }
    // --------------------------

    
    return (
        <div className='chat_main_container'>
           <h3>Chat</h3>
          <div className='chat_messages_list'> Messages:</div>
          {messages.map((message, index) => {
              if(message.id === me) {
                return <div key={index} className='my_own_message'>{message.body}</div>
              }
              return <div key={index} className='friend_message'> {message.body} </div>
          })}
            <form onSubmit={sendMessage}>
            <div className='chat_block'>
               <input value={message} onChange = { handleChange } placeholder='Type your message'/>
           </div>
           <button type="button" className='btn_message_send'> Send message </button>
            </form>
           
        </div>
    )
}


