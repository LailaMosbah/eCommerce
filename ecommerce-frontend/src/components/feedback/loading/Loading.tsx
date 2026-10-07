import type { Loading } from '../../../types'

import CategorySkeleton from "../skeleton/categorySkeleton/categorySkeleton"
import ProductSkeleton from "../skeleton/productSkeleton/ProductSkeleton"
import CartSkeleton from "../skeleton/cartSkeleton/CartSkeleton"



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
        return <p>Error: {error}</p>;
    }
    return (
        <div>
            {children}
        </div>
    )
}
