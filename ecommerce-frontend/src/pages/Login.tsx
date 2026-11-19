import { Navigate, Link } from "react-router-dom";
import useLogin from "@hooks/useLogin";
import { Button, Form, Alert } from "antd";
import InputForm from "@components/common/Forms/InputForm";
import styles from "./styles/auth.module.css";

export default function Login() {
    const {
        error, loading, accessToken, formErrors,
        control, searchParams, handleSubmit, onSubmit,
    } = useLogin();

    if (accessToken) return <Navigate to="/" />;

    return (
        <div className={styles.auth}>
            {/* Brand side */}
            <div className={styles.auth__brand}>
                <span className={styles.auth__brandShape} />
                <span className={styles.auth__brandShape} />
                <span className={styles.auth__brandShape} />
                <h2 className={styles.auth__brandTitle}>
                    Welcome back to <br />
                    <span className={styles.auth__brandTitleAccent}>Our Store</span>
                </h2>
                <p className={styles.auth__brandSubtitle}>
                    Sign in to continue shopping, track your orders, and enjoy exclusive member offers.
                </p>
            </div>

            {/* Form side */}
            <div className={styles.auth__panel}>
                <div className={styles.auth__card}>
                    <h1 className={styles.auth__title}>Login</h1>
                    <p className={styles.auth__subtitle}>Enter your credentials to access your account.</p>

                    {searchParams.get("message") === "account_created" && (
                        <div className={styles.auth__alert}>
                            <Alert
                                message="Your Account Successfully Created, You Can Login"
                                type="success"
                                showIcon
                            />
                        </div>
                    )}
                    {searchParams.get("message") === "login_required" && (
                        <div className={styles.auth__alert}>
                            <Alert
                                message="You Need to Login to see this content"
                                type="info"
                                showIcon
                            />
                        </div>
                    )}

                    <Form
                        name="login"
                        className={styles.auth__form}
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

                        <Form.Item className={styles.auth__submit}>
                            <Button type="primary" htmlType="submit" disabled={loading === "pending"}>
                                {loading === "pending" && <span className={styles.auth__spinner} />}
                                {loading === "pending" ? "Wait..." : "Login"}
                            </Button>
                            {error && <p className={styles.auth__error}>{error}</p>}
                        </Form.Item>
                    </Form>

                    <p className={styles.auth__footer}>
                        Don't have an account?{" "}
                        <Link to="/signup" className={styles.auth__footerLink}>
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}