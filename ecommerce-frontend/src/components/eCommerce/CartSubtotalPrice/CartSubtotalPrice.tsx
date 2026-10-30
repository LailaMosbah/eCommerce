// React 
import { useState } from "react";

// Redux
import { useAppDispatch } from "@app/hooks";
import { actOrderPlace } from "@features/orders/ordersThunk";
import { clearCartAfterPlaceOrder } from "@features/cart/cartSlice";

// Ant design
import { Button, Modal } from "antd";
import styles from "./styles.module.css";

import type { Product } from "../../../types";

type CartSubtotalPriceProps = {
    products: Product[],
    userAccessToken: string | null
}


// Main Function
export default function CartSubtotalPrice({ products, userAccessToken }: CartSubtotalPriceProps) {

    const subTotal = products.reduce((accumulator, product) => {
        const price = +product.price;
        const quantity = product.quantity;
        if (quantity && typeof quantity === "number")
            return accumulator + (price * quantity)
        else
            return accumulator
    }, 0)


    // Order place and its Modal 
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOrderPlace = () => {
        setLoading(true)
        dispatch(actOrderPlace(subTotal))
            .unwrap()
            .then(() => {
                dispatch(clearCartAfterPlaceOrder())
                setIsModalOpen(false)
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setError(null);
    }

    return (
        <>
            <Modal
                title="Order Place"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOrderPlace}
                onCancel={handleCancel}
                // okText={`${loading ? <Spin /> : "Confirm"}`}
                cancelText="cancel"
                confirmLoading={loading}
            >
                Are you sure you want to place order with subtotal {subTotal} ?
                {!loading && error && <p>{error}</p>}
            </Modal>
            <div className={styles.container}>
                <span>Subtotal:</span>
                <span>{subTotal.toFixed(2)}</span>
            </div>

            {(userAccessToken) &&
                <div className={styles.container}>
                    <span>
                        <Button variant="solid" onClick={() => setIsModalOpen(true)}>
                            Place Order
                        </Button>
                    </span>
                </div>
            }

        </>
    )
}
