import React, {useContext} from 'react'
import {SocketContext} from '../SocketContext'
import './Notifications.css'

export const Notifications = () => {
    const {answerCall, isCallAccepted, call} = useContext(SocketContext)

    return (
        <>
        {call.isReceivingCall && !isCallAccepted && (
            <div className="answer_call_block">
                <h1>{call.name} is calling: </h1>
                <button onClick={answerCall} type="button" className="answer_call_btn">
                    Answer
                </button>
            </div>
        )}
        </>
    )
}
