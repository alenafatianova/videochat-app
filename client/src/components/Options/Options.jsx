import React, {useContext, useState} from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {SocketContext} from '../../SocketContext'
import './Options.css'
import {Notifications} from '../Notifications/Notifications'
import { InputComponent } from '../Input/InputComponent'
import { ButtonComponent } from '../Button/ButtonComponent'

export const Options = () => {

    const {me, isCallAccepted, isCallEnded, name, setName, leaveCall, callToUser, isModalActive, setIsModalActive} = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('')
   
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
                                type="button"> Copy </button>
                            </CopyToClipboard>
                        </div>
                    <div className="call_to_block">
                        <h5> Call </h5>
                       <InputComponent placeholder='Paste name or ID here' className='input_form' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
                        {isCallAccepted && !isCallEnded ? (
                            <button type="button" className='end_call_btn' onClick={leaveCall}>
                                Hang Up
                            </button>
                        ) : (
                            <ButtonComponent type="button" className='call_to_user' onClick={() => callToUser(idToCall)}>
                                Call
                            </ButtonComponent>
                        )}
                    </div>  
                </form>
                <Notifications isModalActive={isModalActive} setIsModalActive={setIsModalActive} />    
        </div>
    )
}
