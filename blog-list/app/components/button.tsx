import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ className = "", ...props }: ButtonProps) => (
    <button
        className={`rounded bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${className}`}
        {...props}
    />
)

export default Button
