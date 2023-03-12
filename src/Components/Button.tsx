import React from 'react'

interface ButtonProps{
    size?: string
    color?: string
    onClick?: React.MouseEventHandler
}

const Button: React.FC<ButtonProps> = ({size, color, onClick}) => {
    return (
        <button className={`btn ${size} btn-${color} text-primary font-bold w-44`}
            onClick={onClick}
        >Create new bnb</button>
    )
}
export default Button