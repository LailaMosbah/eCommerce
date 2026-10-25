// React and React Router
import { Navigate } from "react-router-dom";

// Hooks
import useLogin from "@hooks/useLogin";

//Ant Desing
import { Button, Form } from 'antd';
import { Alert } from 'antd';

//Components
import InputForm from "@components/common/Forms/InputForm";


// The Main Function
export default function Login() {
    const { error,
        loading,
        accessToken,
        formErrors,
        control,
        searchParams,
        handleSubmit,
        onSubmit, } = useLogin()

    if (accessToken) {
        return <Navigate to="/" />
    }
    return (

        <>
            <h1>Login</h1>
            {searchParams.get("message") == "account_created" && (
                <Alert title="Your Account Successfully Created , You Can Login " type="success" />
            )}
            {searchParams.get("message") == "login_required" && (
                <Alert title="You Need to Login to see this content " type="info" />
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
                    error={formErrors.email?.message}
                />

                <InputForm
                    name="password"
                    control={control}
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    error={formErrors.password?.message}
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
