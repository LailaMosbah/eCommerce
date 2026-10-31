

import styles from "./styles.module.css";

type ProductInfoProps = {
    title: string;
    img: string;
    price: number;
    quantity?: number;
    direction?: "row" | "column";
    style?: React.CSSProperties;
    children?: React.ReactNode
}
function ProductInfo({ title, img, price, direction = "row", style, children, quantity }: ProductInfoProps) {
    return (
        <>
            <div className={`${styles[`product-${direction}`]}`} style={style}>
                <div className={`${styles[`productImg-${direction}`]}`}>
                    <img
                        src={img}
                        alt={title}
                    />

                </div>
                <div className={`${styles[`productInfo-${direction}`]}`}>
                    <h2>{title}</h2>
                    <h3>{price} EGP</h3>
                    {quantity && <h3>Total Quantity: {quantity}</h3>}
                    {quantity && <h3>Total Price:  {(quantity * price).toFixed(2)}</h3>}
                    {children}
                </div>
            </div>
        </>
    )
}

export default ProductInfo
