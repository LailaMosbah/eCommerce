// Hooks
import useCart from "../hooks/useCart";
//Component
import { CartItemList, CartSubtotalPrice } from "../components/eCommerce/index";
import { Loading, LottiesHandler } from "@components/feedback";

export default function ShoppingCart() {
    const { loading, error, products, changeQuantityHandler, removeCartItemHandler } = useCart();
    return (
        <>
            <h1>Shopping Cart</h1>
            <Loading status={loading} error={error} type="cart">
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
                        <LottiesHandler type="empty" message="Your shopping cart is empty." />
                }

            </Loading>
        </>
    )
}
