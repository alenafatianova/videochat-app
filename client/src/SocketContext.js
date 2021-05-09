import React, {useRef, useState, useEffect, createContext} from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = createContext();

const socket = io('http://localhost:5000')

const ContextProvider = ({children}) => {
    const [me, setMe] = useState('');
    const [stream, setStream] = useState();
    const [call, setCall] = useState({});
    const [isCallAccepted, setIsCallAccepted] = useState(false);
    const [isCallEnded, setIsCallEnded] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

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

        socket.on('callToUser', ({from, name: callerName, signal}) => {
            setCall({isReceivingCall: true, from, name: callerName, signal})
        })

        socket.on("id", (id) => {
            setMe(id);
      })
        socket.on("message", (message) => {
            getMessages(message);
      })

    }, [])

    const getMessages = (message) => {
        setMessages((messages) => [...messages, message]);
    }
    
    const sendMessage = (e) => {
        e.preventDefault();
        const messageData = { body: message, id: me };
        setMessage("");
        socket.emit("sendChatMessage", messageData);
    }

    const answerCall = () => {
        setIsCallAccepted(true)
        
        const peer = new Peer({initiator: false, trickle: false, stream});
        
        peer.on('signal', (data) => {
            socket.emit('answerCall', {signal: data, to: call.from})
        });
        
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };


    const callToUser = (id) => {
        const peer = new Peer({initiator: true, trickle: false, stream})

        peer.on('signal', (data) => {
            socket.emit('callToUser', {userToCall: id, signalData: data, from: me, name});
        });
        
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('isCallAccepted', (signal) => {
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
            call, isCallAccepted, isCallEnded, name, me, myVideo, userVideo, stream, message, messages,
            leaveCall, callToUser, answerCall, setName, setMessage, setMessages, sendMessage,
            }}>
                {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext, socket };