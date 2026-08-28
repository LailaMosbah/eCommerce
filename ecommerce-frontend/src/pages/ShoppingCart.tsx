import { useEffect, useCallback } from "react";
//Reduix
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getProductsByItems, cartItemChangeQuantity, cartItemRemove } from "../features/cart/cartSlice";
//Component
import { CartItemList, CartSubtotalPrice } from "../components/eCommerce/index";
import Loading from "@components/feedback/loading/Loading";

export default function ShoppingCart() {
    const dispatch = useAppDispatch();
    const { productsFullInfo, items, loading, error } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getProductsByItems());
    }, [dispatch]);
    console.log("rendering")

    const products = productsFullInfo.map((product) => ({ ...product, quantity: items[product.id] }));

    // Functions / Handlers for Cart Items
    const changeQuantityHandler = useCallback((id: number, quantity: number) => {
        console.log(id, quantity)
        dispatch(cartItemChangeQuantity({ id, quantity }))
    },
        [dispatch]
    )

    const removeCartItemHandler = useCallback((id: number) => {
        dispatch(cartItemRemove(id))
    }
        , [dispatch]
    )
    return (
        <>
            <h1>Shopping Cart</h1>
            <Loading status={loading} error={error}>
                {
                    products.length > 0 ?
                        <>
                            <CartSubtotalPrice products={products} />
                            <CartItemList
                                products={products}
                                changeQuantityHandler={changeQuantityHandler}
                                removeCartItemHandler={removeCartItemHandler} />
                        </>
                        :
                        <p>Your Cart is Empty</p>
                }

            </Loading>
        </>
    )
}
