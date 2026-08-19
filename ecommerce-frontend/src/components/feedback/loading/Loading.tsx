import type { Loading } from '../../../types'

type LoadingProps = {
    status: Loading;
    error: null | string;
    children: React.ReactNode;
}
export default function Loading({ status, error, children }: LoadingProps) {
    if (status === "pending") {
        return <p>Loading...</p>;
    }
    if (status === "failed") {
        return <p>Error: {error}</p>;
    }
    return (
        <div>
            {children}
        </div>
    )
}
