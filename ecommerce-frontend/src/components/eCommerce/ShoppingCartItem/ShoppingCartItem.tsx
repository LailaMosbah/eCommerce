//React 
import { memo } from 'react';

// Components


// Ant Design
import { Button, InputNumber } from 'antd';
import { Form } from 'antd';
import type { InputNumberProps } from 'antd';

// Types and Styles
import type { Product } from "../../../types";
import styles from "./styles.module.css";
import ProductInfo from '../ProductInfo/ProductInfo';
const { cartItem, product, cartItemSelection } = styles;

type ShoppingCartItemProps = Product & {
    changeQuantityHandler: (id: number, quantity: number) => void
    removeCartItemHandler: (id: number) => void
}


//Main Component
function ShoppingCartItem({ id, img, price, title, max_quantity, quantity, changeQuantityHandler, removeCartItemHandler }: ShoppingCartItemProps) {

    const changeQuantity: InputNumberProps<number>['onChange'] = (value) => {
        if (value === null) return;
        changeQuantityHandler(id, value)
    }

    return (
        <>
            <div className={cartItem}>
                <div className={product}>
                    <ProductInfo title={title} img={img} price={price}>
                        <Button
                            variant="solid"
                            style={{ color: "black" }}
                            className="mt-auto"
                            onClick={() => removeCartItemHandler(id)}
                        >
                            Remove
                        </Button>
                    </ProductInfo>

                </div>
            </div>

            <div className={cartItemSelection}>
                <span className="d-block mb-1">Quantity</span>
                {/* <Form.Select aria-label="Default select example">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Form.Select> */}
                <Form.Item label="InputNumber">
                    <InputNumber max={max_quantity} min={1} value={quantity} onChange={changeQuantity} />
                </Form.Item>
            </div>



        </>
    )
}

export default memo(ShoppingCartItem);