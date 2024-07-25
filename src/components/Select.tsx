import { forwardRef, useId } from "react";

interface InputProps {
    label: string,
    options?: [],
    className?: string,
    [key: string]: unknown
}

const Select = forwardRef<HTMLSelectElement, InputProps>(
    function Select({
        label,
        options,
        className = "",
        ...props
    }, ref) {
        const id = useId();
        return (
            <div className="w-full mt-auto">
                {label && <label htmlFor={id} className="block text-2xl font-medium text-gray-700">{label}</label>}
                <select
                    id={id}
                    ref={ref}
                    className={`p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-2xl border-gray-300 rounded-md ${className}`}
                    {...props}
                >
                    {options?.map((option, index) => <option key={index} value={option}>{option}</option>)}
                </select>
            </div>
        );
    }
);

export default Select;
