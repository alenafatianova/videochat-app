import React, {useContext} from 'react'
import {SocketContext} from '../../SocketContext'
import { Chat } from '../Chat/Chat'
import './VideoPlayer.css'


export const VideoPlayer = () => {

    const {name, isCallAccepted, isCallEnded, stream, myVideo, userVideo, call} = useContext(SocketContext)
    
    return (
        <>
        <div className='video_block_main'>
            {/* My video */}
            {stream && (
                <div className='myVideo_container'>
                <div className='myVideo_block'>
                        <h4>{name || 'Name'}</h4>
                        <video className='video' playsInline muted ref={myVideo} autoPlay />
                    </div>
                </div>
            )}
            
            {/* user's video */}
            {isCallAccepted && !isCallEnded && (
                    <div className='userVideo_container'>
                    <div className='userVideo_block'>
                        <h4>{call.name || 'Name'}</h4>
                        <video className='video' playsInline  ref={userVideo} autoPlay />
                    </div>
                </div>
            )}
           <Chat/>
        </div>
       
        </>
    )
}
