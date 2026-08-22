import type { InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement>

const FormInput = ({ className = "", ...props }: FormInputProps) => (
    <input
        className={`mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
        {...props}
    />
)

export default FormInput
