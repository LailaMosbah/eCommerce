// Hooks
import useCart from "../hooks/useCart";
//Component
import { CartItemList, CartSubtotalPrice } from "../components/eCommerce/index";
import Loading from "@components/feedback/loading/Loading";

export default function ShoppingCart() {
    const { loading, error, products, changeQuantityHandler, removeCartItemHandler } = useCart();
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
