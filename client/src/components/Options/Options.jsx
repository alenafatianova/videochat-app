import React, {useContext, useState} from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {SocketContext} from '../../SocketContext'
import './Options.css'

export const Options = ({children}) => {

    const {me, isCallAccepted, isCallEnded, name, setName, leaveCall, callToUser} = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)

    return (
        <div className='container'>
                <form noValidate autoComplete='off' className='form_class'>
                        <div className="acc_info_block">
                            <h5>Name or ID to call</h5>
                            <input 
                                placeholder='Type name or ID here' 
                                className='input_form' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <CopyToClipboard text={me} >
                            <button 
                                className='main_btn' 
                                type="button" 
                                onClick={() => setIsDisabled(true)} 
                                disabled={isDisabled}
                            > Copy </button>
                            </CopyToClipboard>
                        </div>
                   
                    <div className="call_to_block">
                        <h5>Call to: {name}</h5>
                        <input 
                            placeholder='Paste name or ID here'
                            className='input_form' 
                            value={idToCall} 
                            onChange={(e) => setIdToCall(e.target.value)} 
                        />
                        {isCallAccepted && !isCallEnded ? (
                            <button type="button" className='end_call_btn' onClick={leaveCall}>
                                Hang Up
                            </button>
                        ) : (
                            <button type="button" className='call_to_user' onClick={() => callToUser(idToCall)}>
                                Call
                            </button>
                        )}
                    </div>  
                </form>
                {children}
        </div>
    )
}
