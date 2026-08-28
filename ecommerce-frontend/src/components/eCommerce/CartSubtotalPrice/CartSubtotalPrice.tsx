import type { Product } from "../../../types";
import styles from "./styles.module.css";

type CartSubtotalPriceProps = {
    products: Product[]
}
export default function CartSubtotalPrice({ products }: CartSubtotalPriceProps) {

    const subTotal = products.reduce((accumulator, product) => {
        const price = +product.price;
        const quantity = product.quantity;
        if (quantity && typeof quantity === "number")
            return accumulator + (price * quantity)
        else
            return accumulator
    }, 0)
    return (
        <>
            <div className={styles.container}>
                <span>Subtotal:</span>
                <span>{subTotal.toFixed(2)}</span>
            </div>
        </>
    )
}
