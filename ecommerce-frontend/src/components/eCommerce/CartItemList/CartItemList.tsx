import { ShoppingCartItem } from "../index";
import type { Product } from "../../../types";


type CartItemListProps = {
    products: Product[],
    changeQuantityHandler: (id: number, quantity: number) => void
    removeCartItemHandler: (id: number) => void
}
export default function CartItemList({ products, changeQuantityHandler, removeCartItemHandler }: CartItemListProps) {

    const renderCartItems = products.map((product) =>
        <ShoppingCartItem
            key={product.id}
            {...product}
            changeQuantityHandler={changeQuantityHandler}
            removeCartItemHandler={removeCartItemHandler} />)
    // console.log(products)
    return (
        <>
            {renderCartItems}
        </>
    )
}
