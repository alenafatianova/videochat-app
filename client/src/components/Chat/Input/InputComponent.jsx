import React from 'react';

export const InputComponent = (props) => {
    return (
        <div>
            <div className="chat_block">
                <input className={props.className} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
            </div>
        </div>
    )
}
