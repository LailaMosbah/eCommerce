import { Navigate, Link } from "react-router-dom";
import useSignup from "@hooks/useSignup";
import { Button, Form } from "antd";
import InputForm from "@components/common/Forms/InputForm";
import styles from "./styles/auth.module.css";

export default function Signup() {
    const {
        error, loading, accessToken, control, formState,
        emailAvailabilityStatus, handleSubmit, onSubmit, emailOnBlurHandler,
    } = useSignup();

    if (accessToken) return <Navigate to="/" />;

    return (
        <div className={styles.auth}>
            <div className={styles.auth__brand}>
                <span className={styles.auth__brandShape} />
                <span className={styles.auth__brandShape} />
                <span className={styles.auth__brandShape} />
                <h2 className={styles.auth__brandTitle}>
                    Join us and <br />
                    <span className={styles.auth__brandTitleAccent}>Start Shopping</span>
                </h2>
                <p className={styles.auth__brandSubtitle}>
                    Create your account in seconds and unlock exclusive deals, faster checkout, and order tracking.
                </p>
            </div>

            <div className={styles.auth__panel}>
                <div className={styles.auth__card}>
                    <h1 className={styles.auth__title}>Sign Up</h1>
                    <p className={styles.auth__subtitle}>Create your account to get started.</p>

                    <Form
                        name="signup"
                        className={styles.auth__form}
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
                            error={
                                formState.email?.message
                                    ? formState.email?.message
                                    : emailAvailabilityStatus === "unValid"
                                        ? "The email is in use"
                                        : emailAvailabilityStatus === "failed"
                                            ? "Error from the server"
                                            : ""
                            }
                            formText={
                                emailAvailabilityStatus === "checking"
                                    ? "We are currently checking the availability of email, Please wait a moment"
                                    : ""
                            }
                            success={emailAvailabilityStatus === "vaild" ? "Your Email is valid" : ""}
                            disabled={emailAvailabilityStatus === "checking"}
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
                            placeholder="Confirm Password"
                            error={formState.confirmPassword?.message}
                            type="password"
                        />

                        <Form.Item className={styles.auth__submit}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    emailAvailabilityStatus === "checking" ||
                                    loading === "pending"
                                }
                            >
                                {loading === "pending" && <span className={styles.auth__spinner} />}
                                {loading === "pending" ? "Wait..." : "Sign Up"}
                            </Button>
                            {error && <p className={styles.auth__error}>{error}</p>}
                        </Form.Item>
                    </Form>

                    <p className={styles.auth__footer}>
                        Already have an account?{" "}
                        <Link to="/login" className={styles.auth__footerLink}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}