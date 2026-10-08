import type { Loading } from '../../../types'

import CategorySkeleton from "../skeleton/categorySkeleton/categorySkeleton"
import ProductSkeleton from "../skeleton/productSkeleton/ProductSkeleton"
import CartSkeleton from "../skeleton/cartSkeleton/CartSkeleton"

import LottiesHandler from '../lottiesHandler/LottiesHandler'

const skeletonComponents = {
    category: CategorySkeleton,
    product: ProductSkeleton,
    cart: CartSkeleton,
};

type LoadingProps = {
    status: Loading;
    error: null | string;
    children: React.ReactNode;
    type?: keyof typeof skeletonComponents;
}
export default function Loading({ status, error, children, type = "category" }: LoadingProps) {

    const SkeletonComponent = skeletonComponents[type];
    if (status === "pending") {
        return <SkeletonComponent />
    }
    if (status === "failed") {
        return <LottiesHandler type="error" message={error || "Unexpected error occurred."} />;
    }
    return (
        <div>
            {children}
        </div>
    )
}
