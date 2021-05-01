import React, {useContext} from 'react'
import {SocketContext} from '../SocketContext'

export const Notifications = () => {

    const {answerCall, isCallAccepted, call} = useContext(SocketContext)

    return (
        <>
        {call.isReceivingCall && !isCallAccepted && (
            <div>
                <h1>{call.name} is calling: </h1>
                <button onClick={answerCall}>Answer</button>
            </div>
        )}
        </>
    )
}
