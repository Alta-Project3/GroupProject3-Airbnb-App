import React from 'react'

interface ButtonProps{
    size?: string
    color?: string
    onClick?: React.MouseEventHandler
    children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({size, color, onClick, children}) => {
    return (
        <button className={`btn ${size} ${color} text-primary font-bold cursor-pointer sm:font-bold`}
            onClick={onClick}
        >{children}</button>
    )
}
export default Button