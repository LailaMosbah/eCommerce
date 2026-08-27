import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getProductsByItems } from "../features/cart/cartSlice";

import { CartItemList, CartSubtotalPrice } from "../components/eCommerce/index";
import Loading from "@components/feedback/loading/Loading";

export default function ShoppingCart() {
    const dispatch = useAppDispatch();
    const { productsFullInfo, items, loading, error } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getProductsByItems());
    }, [dispatch]);

    const products = productsFullInfo.map((product) => ({ ...product, quantity: items[product.id] }));

    return (
        <>
            <h1>Shopping Cart</h1>
            <Loading status={loading} error={error}>
                <CartSubtotalPrice />
                <CartItemList products={products} />
            </Loading>
        </>
    )
}
