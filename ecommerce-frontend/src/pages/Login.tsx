// React Hook Form
import { useForm, type SubmitHandler } from "react-hook-form"

//Ant Desing
import { Button, Form, Input } from 'antd';



type LoginFormValues = {
    email: string;
    password: string;
};

export default function Login() {
    const { register, handleSubmit } = useForm<LoginFormValues>();

    const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
        console.log(data);
    }

    return (

        <>
            <h1>Login</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={handleSubmit(onSubmit)}
            >

                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input {...register("email")} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                >
                    <Input.Password {...register("password")} />
                </Form.Item>


                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    )

}
