import React from 'react';

export const InputComponent = (props) => {
    return (
        <>
            <input className={props.className} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
        </>
    )
}
