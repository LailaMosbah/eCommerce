import { memo, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { addToCart } from "../../../features/cart/cartSlice";
import { toggleLikeProduct } from "@features/wishlist/wishlistSlice";

import ProductInfo from "../ProductInfo/ProductInfo";
import styles from "./styles.module.css";
import Like from "@assets/svg/like.svg";
import LikeFill from "@assets/svg/like-fill.svg";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin, message, Button } from "antd";

import type { Product } from "../../../types";

export default memo(function Product({ product }: { product: Product }) {
    const dispatch = useAppDispatch();

    // Cart Quantity Logic
    const currentRemainingQuantity =
        Number(product.max_quantity) - (product.quantity ?? 0);
    const isAddToCartDisabled = currentRemainingQuantity <= 0;

    const addToCartHandler = () => {
        dispatch(addToCart(product.id));
    };

    // Wishlist Logic
    const [isLoading, setIsLoading] = useState(false);
    const toggleLikeHandler = async () => {
        if (isLoading) return;
        if (product.isAuthenticated) {
            setIsLoading(true);
            try {
                await dispatch(toggleLikeProduct(product.id)).unwrap();
            } catch {
                console.error("Error toggling like product");
            } finally {
                setIsLoading(false);
            }
        } else {
            info();
        }
    };

    // Modal for Like toggle
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info("You Must Login to add it on Whishlist");
    };

    return (
        <article className={styles.card}>
            {contextHolder}

            <ProductInfo
                title={product.title}
                price={product.price}
                img={product.img}
                direction="column"
                style={{}}
                /* ↓ opt-in to elevated card styling */
                className="product--elevated"
            >
                <Button
                    type="text"
                    className={`${styles.wishListBtn} ${product.isLiked ? styles["wishListBtn--active"] : ""
                        }`}
                    aria-label={
                        product.isLiked ? "Remove from wishlist" : "Add to wishlist"
                    }
                    onClick={toggleLikeHandler}
                >
                    {isLoading ? (
                        <Spin
                            indicator={<LoadingOutlined style={{ fontSize: 22 }} spin />}
                        />
                    ) : product.isLiked ? (
                        <img src={LikeFill} alt="Liked" />
                    ) : (
                        <img src={Like} alt="Not liked" />
                    )}
                </Button>

                <span
                    className={`${styles.stockBadge} ${isAddToCartDisabled ? styles["stockBadge--out"] : styles["stockBadge--in"]
                        }`}
                >
                    <span className={styles.stockBadge__dot} />
                    {isAddToCartDisabled ? "Out of stock" : "In stock"}
                </span>

                {!isAddToCartDisabled && (
                    <p className={styles.qtyHint}>
                        Add up to {currentRemainingQuantity} more
                    </p>
                )}

                <Button
                    onClick={addToCartHandler}
                    disabled={isAddToCartDisabled}
                    className={styles.addToCartBtn}
                >
                    Add to Cart
                </Button>
            </ProductInfo>
        </article>
    );
});