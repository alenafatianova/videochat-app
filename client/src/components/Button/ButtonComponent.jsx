import React from 'react'

export const ButtonComponent = ({type, className, onClick, children}) => {

    console.log(type)
    return (
        <>
            <button type={type} className={className} onClick={onClick}> {children} </button>
        </>
    )
}
