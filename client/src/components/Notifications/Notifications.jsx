import React, {useContext} from 'react'
import {SocketContext} from '../../SocketContext'
import './Notifications.css'

export const Notifications = ({isModalActive, setIsModalActive }) => {
    const {answerCall, isCallAccepted, call} = useContext(SocketContext)
    
    return (
        <div className={isModalActive ? 'modal active' : 'modal'}  >
        {call.isReceivingCall && !isCallAccepted &&  (
            <div className= {isModalActive ? 'modal_content active' : 'modal_content'} >
                <h1>{call.name} is calling: </h1>
                <button 
                    onChange={() => setIsModalActive(false)}
                    onClick={answerCall} 
                    type="button" 
                    className="answer_call_btn" > Answer </button>
            </div>
        )}
        </div>
    )
}
