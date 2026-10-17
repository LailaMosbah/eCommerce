// React and React Router
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// React Hook Form and zod
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { loginSchema, type LoginFormValues } from "@validations/loginSchema";

// Rediux
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { authLogin, clearStateAuth } from "@features/auth/authSlice";


//Ant Desing
import { Button, Form } from 'antd';
import { Alert } from 'antd';

//Components
import InputForm from "@components/common/Forms/InputForm";


// The Main Function
export default function Login() {
    const dispatch = useAppDispatch()
    const { error, loading } = useAppSelector(state => state.auth)
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()


    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        mode: "onBlur",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }

    });

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        console.log(data);
        if (searchParams.get("message")) {
            setSearchParams("")
        }
        dispatch(authLogin(data)).unwrap().then(() => {
            navigate("/")
        })
    }


    useEffect(() => {
        return () => {
            dispatch(clearStateAuth())
        }
    }, [dispatch])

    return (

        <>
            <h1>Login</h1>
            {searchParams.get("message") == "account_created" && (
                <Alert title="Your Account Successfully Created , You Can Login " type="success" />
            )}
            <Form
                name="login"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={handleSubmit(onSubmit)}
            >


                <InputForm
                    name="email"
                    control={control}
                    label="Email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                />

                <InputForm
                    name="password"
                    control={control}
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    error={errors.password?.message}
                />

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" disabled={loading == "pending"}>
                        {loading == "pending" ? "wait ..." : "Login"}
                    </Button>
                    {error && <p>{error}</p>}
                </Form.Item>
            </Form>
        </>
    )

}
