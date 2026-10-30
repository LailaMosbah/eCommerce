import { useAppSelector } from "@app/hooks";

const Account = () => {
    const accountInfo = useAppSelector((state) => state.auth.user);

    return (
        <>
            <h1>Account Info</h1>
            <ul>
                <li>First Name: {accountInfo?.firstName}</li>
                <li>Last Name: {accountInfo?.lastName}</li>
                <li>Email: {accountInfo?.email}</li>
            </ul>
        </>
    );
};

export default Account;