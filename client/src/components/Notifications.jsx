import React, {useContext} from 'react'
import {SocketContext} from '../SocketContext'

export const Notifications = () => {
    const {answerCall, isCallAccepted, call} = useContext(SocketContext)

    return (
        <>
        {call.isReceivingCall && !isCallAccepted && (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <h1>{call.name} is calling: </h1>
                <button onClick={answerCall} type="button">
                    Answer
                </button>
            </div>
        )}
        </>
    )
}
