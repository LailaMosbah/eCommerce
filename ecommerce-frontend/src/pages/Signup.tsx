// React and React Router
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// React Hook Form and zod
import { signupSchema, type SignupFormValues } from "@validations/signupSchema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Rediux
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { authRegister, clearStateAuth } from "@features/auth/authSlice";


//Hooks 
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";

// Ant Design
import { Button, Form } from "antd";

//Components
import InputForm from "@components/common/Forms/InputForm";


// The Main Function
export default function Signup() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { error, loading } = useAppSelector((state) => state.auth)
    const {
        control,
        handleSubmit,
        formState: { errors },
        getFieldState,
        trigger,
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

    const { emailEntered, checkEmailAvailability, emailAvailabilityStatus, resetCheckEmailAvailability } = useCheckEmailAvailability();


    const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
        const { firstName, lastName, email, password } = data;
        dispatch(authRegister({ firstName, lastName, email, password })).unwrap().then(() => {
            navigate("/login?message=account_created")
        })
    };

    const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        await trigger("email");
        const { isDirty, invalid } = getFieldState("email");
        if (isDirty && !invalid && emailEntered != emailValue) {
            checkEmailAvailability(emailValue)
        }

        if (isDirty && !invalid && emailEntered) {
            resetCheckEmailAvailability();
        }

    }

    useEffect(() => {
        return () => {
            dispatch(clearStateAuth())
        }
    }, [dispatch])

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
                    onBlur={emailOnBlurHandler}
                    error={errors.email?.message ? errors.email?.message : emailAvailabilityStatus == "unValid" ? "The email is in use" : emailAvailabilityStatus == "failed" ? "Error from the server" : ""}
                    formText={emailAvailabilityStatus == "checking" ? "We are currently checking the availability of email , Please wait a moment" : ""}
                    success={emailAvailabilityStatus == "vaild" ? "Your Email is vaild" : ""}
                    disabled={emailAvailabilityStatus == "checking"}
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
                    <Button type="primary" htmlType="submit" disabled={emailAvailabilityStatus == "checking" || loading == "pending"}>
                        {loading == "pending" ? "wait ..." : "Sign Up"}
                    </Button>
                    {error && <p>{error}</p>}
                </Form.Item>
            </Form>
        </>
    );
}
