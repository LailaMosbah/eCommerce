// React Hook Form and zod
import { signupSchema, type SignupFormValues } from "@validations/signupSchema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Ant Design
import { Button, Form } from "antd";

//Components
import InputForm from "@components/common/Forms/InputForm";

export default function Signup() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        mode: "onBlur",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
        console.log(data);
    };

    return (
        <>
            <h1>Sign Up</h1>

            <Form
                name="signup"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={handleSubmit(onSubmit)}
            >
                <InputForm
                    name="firstName"
                    control={control}
                    label="First Name"
                    placeholder="Enter first name"
                    error={errors.firstName?.message}
                />
                <InputForm
                    name="lastName"
                    control={control}
                    label="Last Name"
                    placeholder="Enter last name"
                    error={errors.lastName?.message}
                />

                <InputForm
                    name="email"
                    control={control}
                    label="Email"
                    placeholder="Enter your Email"
                    error={errors.email?.message}
                />

                <InputForm
                    name="password"
                    control={control}
                    label="Password"
                    placeholder="Enter Password"
                    error={errors.password?.message}
                    type="password"
                />

                <InputForm
                    name="confirmPassword"
                    control={control}
                    label="Confirm Password"
                    placeholder="Confirm  Password"
                    error={errors.confirmPassword?.message}
                    type="password"
                />


                <Form.Item label={null} wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
