// React Hook Form and zod
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { loginSchema, type LoginFormValues } from "@validations/loginSchema";

//Ant Desing
import { Button, Form } from 'antd';

//Components
import InputForm from "@components/common/Forms/InputForm";



export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        mode: "onBlur",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }

    });

    const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
        console.log(data);
    }

    return (

        <>
            <h1>Login</h1>
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
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    )

}
