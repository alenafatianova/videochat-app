import React, {useRef, useState, useEffect, createContext} from 'react'
import {io} from 'socket.io-client'
import Peer from 'simple-peer'

export const SocketContext = createContext();

const socket = io('http://localhost:5000')

export const ContextProvider = ({children}) => {

    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [isCallAccepted, setIsCallAccepted] = useState(false);
    const [isCallEnded, setIsCallEnded] = useState(false);
    const [name, setName] = useState('');


    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((currentStream) => {
            setStream(currentStream)
            myVideo.current.srcObject = currentStream;
        })

        socket.on('me', (id) => setMe(id))

        socket.on('calluser', ({from, name: callerName, signal}) => {
            setCall({isReceivingCall: true, from, name: callerName, signal})
        })
    }, [])

    const answerCall = () => {
        
        setIsCallAccepted(true)
        
        const peer = new Peer({initiator: false, trickle: false, stream})
        
        peer.on('signal', (data) => {
            socket.emit('answercall', {signal: data, to: call.from})
        })
        
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        peer.signal(call.signal);

        connectionRef.current = peer;
    };


    const callToUser = (id) => {
        const peer = new Peer({initiator: true, trickle: false, stream})

        peer.on('signal', (data) => {
            socket.emit('calluser', {userToCall: id, signalData: data, from: me, name})
        });
        
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.on('callaccepted', (signal) => {
            setIsCallAccepted(true)

            peer.signal(signal)
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        
        setIsCallEnded(true);
        
        connectionRef.current.destroy();

        window.location.reload();
    }
    return (
        <SocketContext.Provider value={{
            call, isCallAccepted, isCallEnded,
            leaveCall, callToUser, answerCall, myVideo,
            userVideo, stream, name, setName,me}}>
                {children}
        </SocketContext.Provider>
    )
}