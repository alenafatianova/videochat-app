import React from 'react'

export const ButtonComponent = ({type, className, children}) => {

    console.log(type)
    return (
        <>
            <button type={type} className={className}> {children} </button>
        </>
    )
}
