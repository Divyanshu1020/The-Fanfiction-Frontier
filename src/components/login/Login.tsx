import { useForm, SubmitHandler } from "react-hook-form"
import Input from "../ui/input/Input"
type Inputs = {
    email: string
    password: string
}
export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    errors.
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
                        }
                    }
                )
            }
        />
        <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            {...register(
                "password", 
                    { 
                        required: true,
                    }
                )
            }
        />
        <button type="submit">Log in</button>
    </form>
  )
}
