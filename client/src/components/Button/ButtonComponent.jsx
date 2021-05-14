import React from 'react'

export const ButtonComponent = (props) => {
    return (
        <>
            <button type={props.type} className={props.className}> {props.text} </button>
        </>
    )
}
