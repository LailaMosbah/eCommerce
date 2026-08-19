// src/pages/ErrorPage.tsx
import { Button, Result } from 'antd';
import { NavLink, useRouteError, isRouteErrorResponse } from 'react-router-dom';



export default function ErrorPage() {
    const error = useRouteError();

    let status = 500;
    let statusText = "Something went wrong";
    let message = "An unexpected error occurred.";

    // الطريقة الصحيحة والآمنة
    if (isRouteErrorResponse(error)) {
        status = error.status;
        statusText = error.statusText;
        message = error.data?.message || error.data || message;
    }
    else if (error instanceof Error) {
        message = error.message;
    }

    // رسائل مخصصة حسب الـ status (Dynamic)
    const getErrorMessage = (status: number) => {
        switch (status) {
            case 400:
                return "Bad Request - Invalid data";
            case 404:
                return "The page you are looking for does not exist.";
            case 401:
            case 403:
                return "You don't have permission to access this page.";
            case 500:
                return "Internal Server Error. Please try again later.";
            default:
                return message;
        }
    };

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px"
        }}>
            <Result
                status={status >= 500 ? "500" : status >= 400 ? "404" : "error"}
                title={status}
                subTitle={statusText || getErrorMessage(status)}
                extra={
                    <Button type="primary" size="large">
                        <NavLink to="/" replace>
                            Back to Home
                        </NavLink>
                    </Button>
                }
            />
        </div>
    );
}