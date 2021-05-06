import React, {useContext, useEffect} from 'react'
import {SocketContext} from '../../SocketContext'
import './Chat.css'
import io from 'socket.io-client'

let socket;

export const Chat = () => {

    const {name, setName, messages, setMessages, message, setMessage} = useContext(SocketContext)
    const end_point = 'http://localhost:5000/'
   
   useEffect(() => {
        socket = io(end_point)
        setName(name)
   }, [name, setName, end_point])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault()

        if(message) {
            socket.emit('message', message, () => {setMessage('')})
        }
    }

    console.log(message, messages)

    return (
        <div className='chat_main_container'>
           <h3>Chat</h3>
           <div className='chat_block'>
               <input 
                    value={message}
                    type="text" 
                    placeholder='Type your message'
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    onKeyPress={e => e.key === 'Enter' ?  sendMessage(e) : null}
                    />
                    <button className='btn_message_send'>
                        Send message
                    </button>
           </div>
        </div>
    )
}


