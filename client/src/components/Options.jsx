import React, {useContext, useState} from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {SocketContext} from '../SocketContext'
import './Options.css'

export const Options = ({children}) => {

    const {me, isCallAccepted, isCallEnded, name, setName, leaveCall, callToUser} = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('')

    return (
        <div className='container'>
                <form noValidate autoComplete='off' className='form_class'>
                    <div className="gridContainer">
                        <div className="padding">
                            <h5>Account Info</h5>
                            <input label='Name' className='input_form' value={name} onChange={(e) => setName(e.target.value)} />
                            <CopyToClipboard text={me} className="clipboard">
                            <button className='main_btn' type="button">
                                Copy Your ID
                            </button>
                            </CopyToClipboard>
                        </div>
                    </div>

                    <div className="padding">
                        <h5>Call to someone</h5>
                        <input className='input_form' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
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
