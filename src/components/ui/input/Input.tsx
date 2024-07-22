import { forwardRef, useId } from "react";
interface InputProps {
    label: string,
    type?: string,
    className?: string,
    placeholder:string,
    [key: string]: unknown
  }

export default forwardRef<HTMLInputElement, InputProps>(
    function Input({
        label,
        type="text",
        className="",
        placeholder,
        ...props
    }, ref) {
        const id = useId()
    return (
      
      <div>
        <div className=" space-y-5">
          <div className=" w-full">
              {label && (
                  <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {label}
                  </label>
              )}
              <div className="mt-1">
                  <input
                    type={type}
                    id={id}
                    ref={ref}
                    placeholder={placeholder}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${className}`}
                    {...props}
                  />
              </div>
          </div>
        </div>
      </div>
    )
  }
)
