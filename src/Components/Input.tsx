import { InputHTMLAttributes } from "react";

interface InputProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    placeholder: string
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
    label,
    name,
    type,
    value,
    onChange,
    placeholder
}) => {
    return (
        <div className="mb-1">
            <label className="block text-gray-700 font-bold mb-2" htmlFor={name}>
                {label}
            </label>
            <input
                className="input input-sm input-bordered w-full max-w-xs"
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input;