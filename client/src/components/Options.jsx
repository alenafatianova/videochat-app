import React, {useContext, useState} from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {SocketContext} from '../SocketContext'
import './Options.css'


export const Options = ({children}) => {
    
    const context = useContext(SocketContext)

    const {me, isCallAccepted, isCallEnded, name, setName, leaveCall, callToUser} = useContext(SocketContext)
    const [idToCall, setIdToCall] = useState('')


    return (
        <div className='container'>
            <div>
                <form noValidate autoComplete='off' className='form_class'>
                    <h5>Account Info</h5>
                    <label>Name</label>
                        <input className='input_form' value={name} onChange={(e) => {setName(e.currentTarget.value)}} />
                        <CopyToClipboard>
                            <button className='main_btn'></button>
                        </CopyToClipboard>
                </form>
            </div>
            Options
            {children}
        </div>
    )
}
