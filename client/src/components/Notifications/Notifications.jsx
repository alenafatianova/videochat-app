import React, {useContext} from 'react'
import {SocketContext} from '../../SocketContext'
import { ButtonComponent } from '../Button/ButtonComponent'
import './Notifications.css'

export const Notifications = ({isModalActive, setIsModalActive }) => {
    const {answerCall, isCallAccepted, call} = useContext(SocketContext)
    
    return (
        <div className={isModalActive ? 'modal active' : 'modal'}  >
        {call.isReceivingCall && !isCallAccepted &&  (
            <div className= {isModalActive ? 'modal_content active' : 'modal_content'} >
                <h1>{call.name} is calling: </h1>
                <ButtonComponent 
                    onClick={answerCall} 
                    type="button" 
                    className="answer_call_btn" 
                    onChange={() => setIsModalActive(false)}>Answer</ButtonComponent>
            </div>
        )}
        </div>
    )
}
