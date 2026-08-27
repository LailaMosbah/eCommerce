import { ShoppingCartItem } from "../index";
import type { Product } from "../../../types";


type CartItemListProps = { products: Product[] }
export default function CartItemList({ products }: CartItemListProps) {
    const renderCartItems = products.map((product) => <ShoppingCartItem key={product.id} {...product} />)
    // console.log(products)
    return (
        <>
            {renderCartItems}
        </>
    )
}
