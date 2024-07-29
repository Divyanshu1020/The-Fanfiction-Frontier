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
        <div className=" ">
          <div className=" w-full">
              {label && (
                  <label
                    htmlFor={id}
                    className="block text-2xl font-medium text-gray-700"
                  >
                    {label}
                  </label>
              )}
              <div className="my-2 font-thin">
                  <input
                    type={type}
                    id={id}
                    ref={ref}
                    placeholder={placeholder}
                    className={` p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-2xl
                      border border-gray-300 rounded-md ${className}`}
                    {...props}
                  />
              </div>
          </div>
        </div>
      </div>
    )
  }
)
