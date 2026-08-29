import { memo } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { addToCart } from "../../../features/cart/cartSlice";

//Components and assests
import { Button, Card } from 'antd';
const { Meta } = Card;

import styles from "./styles.module.css"
import Like from "@assets/like.svg"
import LikeFill from "@assets/like-fill.svg"


import type { Product } from "../../../types"



export default memo(function Product({ product }: { product: Product }) {
    const dispatch = useAppDispatch();
    // console.log("product", product)
    console.log("fire")
    const currentRemainingQuantity = (Number(product.max_quantity) - ((product.quantity) ?? 0))
    const isAddToCartDisabled = currentRemainingQuantity <= 0



    const addToCartHandler = () => {
        dispatch(addToCart(product.id))
    }

    return (
        <>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={
                    <img
                        draggable={false}
                        alt="example"
                        src={product.img}
                    />
                }
            >
                <Button
                    type="text"
                    className={styles.wishListBtn}
                    aria-label="Add to wishlist"
                >
                    <img
                        src={Like}
                        alt=""
                    />
                </Button>

                {/* <p>Remaining Quantity: {currentRemainingQuantity}</p> */}
                <p>{isAddToCartDisabled ? "Out of stock" : "In stock"}</p>
                <p>{isAddToCartDisabled ? "" : `you can add ${currentRemainingQuantity} more items to your cart`}</p>
                <Button
                    onClick={addToCartHandler}
                    disabled={isAddToCartDisabled}
                >
                    Add to Cart
                </Button>
                <Meta title={product.title} description={product.price} />
            </Card>
        </>
    )
}
)