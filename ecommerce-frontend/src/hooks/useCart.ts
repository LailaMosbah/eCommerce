import { useEffect, useCallback } from "react";
//Reduix
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getProductsByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  clearCartProductsFullInfo,
} from "../features/cart/cartSlice";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfo, items, loading, error } = useAppSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    const promise = dispatch(getProductsByItems());
    return () => {
      promise.abort(); // Cancel the request if the component unmounts
      dispatch(clearCartProductsFullInfo());
    };
  }, [dispatch]);
  console.log("rendering");

  const products = productsFullInfo.map((product) => ({
    ...product,
    quantity: items[product.id],
  }));

  // Functions / Handlers for Cart Items
  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      console.log(id, quantity);
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch],
  );

  const removeCartItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch],
  );

  return {
    loading,
    error,
    products,
    changeQuantityHandler,
    removeCartItemHandler,
  };
};

export default useCart;
