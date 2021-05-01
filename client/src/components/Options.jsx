import React, {useContext, useState} from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {SocketContext} from '../SocketContext'
import './Options.css'


export const Options = ({children}) => {

    const {me, isCallAccepted, isCallEnded, name, setName, leaveCall, callToUser} = useContext(SocketContext)
    const [idToCall, setIdToCall] = useState('')


    return (
        <div className='container'>
            <div>
                <form noValidate autoComplete='off' className='form_class'>
                    
                    <h5>Account Info</h5>
                    <label>Name</label>
                        <input className='input_form' value={name} onChange={(e) => {setName(e.currentTarget.value)}} />
                        {console.log(me)}
                        <CopyToClipboard text={me}>
                            <button className='main_btn'>Copy Your ID</button>
                        </CopyToClipboard>

                        <h5>Call to someone</h5>
                    <label>ID to call</label>
                        <input className='input_form' value={idToCall} onChange={(e) => setIdToCall(e.currentTarget.value)} />
                        {isCallAccepted && !isCallEnded ? (
                            <button className='end_call_btn' onClick={leaveCall}>Hang Up</button>
                        ) : (
                            <button className='call_to_user' onClick={callToUser(idToCall)}>
                                Call
                            </button>
                        )}
                </form>

                {children}

            </div>
        </div>
    )
}
