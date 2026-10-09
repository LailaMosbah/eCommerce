// React Hook Form
import { useForm, type SubmitHandler } from "react-hook-form"


// Ant Design
// import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';




type SignupFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function Signup() {

    const { register, handleSubmit } = useForm<SignupFormValues>();
    const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
        console.log(data);
    };
    return (
        <>
            <h1>Sign Up</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={handleSubmit(onSubmit)}
            >
                <Form.Item
                    label="First Name"
                    name="firstName"
                >
                    <Input {...register("firstName")} />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                >
                    <Input {...register("lastName")} />
                </Form.Item>

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

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                >
                    <Input.Password {...register("confirmPassword")} />
                </Form.Item>


                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
