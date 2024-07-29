import { useForm, SubmitHandler } from "react-hook-form"
import Input from "../ui/input/Input"
import authService from "@/appwrite/auth"
import { useDispatch } from "react-redux"
import { login } from "@/redux/auth.Slice"
import { useNavigate } from "react-router-dom"

type Inputs = {
    email: string
    password: string
}
export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
      } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        try {
            const section = await authService.login(data.email, data.password);
            if (section) {
                const userData = await authService.getCurrentUser();
                if(userData) {
                    dispatch(login({userData}))
                    navigate("/")
                }
            }
        } catch (error) {
            setError("root", { 
                    type: "manual",
                    message: `Error | ${error}`
                }
            )
        }
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Input
            type="text"
            label="Email"
            placeholder="Enter your email"
            {...register(
                "email", 
                    { 
                        required: true,
                        validate: {
                            matchPatern: (value) => {
                                return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Please enter a valid email"
                            }
                        },
                        maxLength: {
                            value: 50,
                            message:"Email must be at most 50 characters long",
                        }
                    }
                )
            }
        />
        {errors.email && <p className=" text-center text-wrap text-xs  text-red-600">{errors.email?.message}</p>}
        <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            {...register(
                "password", 
                    { 
                        required: true,
                        maxLength: {
                            value: 50,
                            message:"Password must be at most 50 characters long",
                        }
                    }
                )
            }
        />
        
        {errors.password && <p className=" text-center text-wrap text-xs  text-red-600">{errors.password?.message}</p>}
        
        <button 
            className="bg-[#3b49df] disabled:bg-slate-400 text-white sm:text-xl p-2 my-2 sm:p-3 rounded-md w-full" 
            disabled={isSubmitting} 
            type="submit">{
                isSubmitting ? "Submitting..." : "Login"
            }</button>
        <div className=" py-2  text-xs  overflow-hidden ">
            {errors.root &&<p className=" text-center text-wrap  text-red-600">{errors.root?.message}</p>}
        </div>
        <p className=" sm:text-xl">Don't have an account? <a href="/signup" className="text-[#3b49df]">Sign up</a></p>
    </form>
  )
}
