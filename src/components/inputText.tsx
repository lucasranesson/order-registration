import { Dispatch, SetStateAction } from "react"

interface InputTextProps {
    value : string
    onChange : Dispatch<SetStateAction<string>>
    placeholder : string
}

export function InputText({ value, onChange, placeholder} : InputTextProps) {
    return (
        <input 
            type="text" 
            className="w-full text-sm leading-6 bg-slate-900 p-2 rounded text-gray-100 flex-1"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                onChange(e.target.value)
            }}
            required={true}
        />
    )
}