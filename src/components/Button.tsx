import type { ButtonProps } from "../types/todo"


const Button = ({
    className = '',
    size = 'default',
    text,
    pending = false,
    onClick,
    disabled = false,
    type = 'button',
    icon,
}: ButtonProps) => {
    const sizeStyles = {
        default: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        sm: 'px-2 py-1 text-sm',
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={pending || disabled}
            className={`
                ${sizeStyles[size]}
                ${disabled || pending ? 'opacity-50 cursor-not-allowed' : ''}
                ${className ? className : 'bg-blue-500 text-white transition hover:bg-blue-600'}
                rounded capitalize
            `}
        >
            {pending ? 'Loading...' : <span className="flex items-center justify-center gap-2">{text && <h1>{text}</h1>} {icon && icon}</span>}
        </button>
    )
}

export default Button