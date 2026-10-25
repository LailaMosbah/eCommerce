// React and React Router
import { Navigate } from "react-router-dom";

// Hooks
import useSignup from "@hooks/useSignup";

// Ant Design
import { Button, Form } from "antd";

//Components
import InputForm from "@components/common/Forms/InputForm";


// The Main Function
export default function Signup() {
    const { error,
        loading,
        accessToken,
        control,
        formState,
        emailAvailabilityStatus,
        handleSubmit,
        onSubmit,
        emailOnBlurHandler, } = useSignup()



    if (accessToken) {
        return <Navigate to="/" />
    }

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
                    error={formState.firstName?.message}
                />
                <InputForm
                    name="lastName"
                    control={control}
                    label="Last Name"
                    placeholder="Enter last name"
                    error={formState.lastName?.message}
                />

                <InputForm
                    name="email"
                    control={control}
                    label="Email"
                    placeholder="Enter your Email"
                    onBlur={emailOnBlurHandler}
                    error={formState.email?.message ? formState.email?.message : emailAvailabilityStatus == "unValid" ? "The email is in use" : emailAvailabilityStatus == "failed" ? "Error from the server" : ""}
                    formText={emailAvailabilityStatus == "checking" ? "We are currently checking the availability of email , Please wait a moment" : ""}
                    success={emailAvailabilityStatus == "vaild" ? "Your Email is vaild" : ""}
                    disabled={emailAvailabilityStatus == "checking"}
                />

                <InputForm
                    name="password"
                    control={control}
                    label="Password"
                    placeholder="Enter Password"
                    error={formState.password?.message}
                    type="password"
                />

                <InputForm
                    name="confirmPassword"
                    control={control}
                    label="Confirm Password"
                    placeholder="Confirm  Password"
                    error={formState.confirmPassword?.message}
                    type="password"
                />


                <Form.Item label={null} wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" disabled={emailAvailabilityStatus == "checking" || loading == "pending"}>
                        {loading == "pending" ? "wait ..." : "Sign Up"}
                    </Button>
                    {error && <p>{error}</p>}
                </Form.Item>
            </Form>
        </>
    );
}
