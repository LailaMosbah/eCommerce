import { memo } from "react";
//Redux
import { useAppDispatch } from "../../../app/hooks";
import { addToCart } from "../../../features/cart/cartSlice";
import { toggleLikeProduct } from "@features/wishlist/wishlistSlice"

//Components and assests
import { Button, Card } from 'antd';
const { Meta } = Card;

import styles from "./styles.module.css"
import Like from "@assets/like.svg"
// import LikeFill from "@assets/like-fill.svg"


import type { Product } from "../../../types"



// Main Function Component
export default memo(function Product({ product }: { product: Product }) {
    const dispatch = useAppDispatch();

    //Cart Quantity Logic
    const currentRemainingQuantity = (Number(product.max_quantity) - ((product.quantity) ?? 0))
    const isAddToCartDisabled = currentRemainingQuantity <= 0
    const addToCartHandler = () => {
        dispatch(addToCart(product.id))
    }

    //Wishlist Logic
    const toggleLikeHandler = () => {
        dispatch(toggleLikeProduct(product.id))
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
                    onClick={toggleLikeHandler}
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