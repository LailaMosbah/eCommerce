import { useEffect, useCallback } from "react";
//Reduix
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getProductsByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  clearCartProductsFullInfo,
} from "../features/cart/cartSlice";
import { resetOrderPlaceStatus } from "@features/orders/ordersSlice";

//Hook
const useCart = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfo, items, loading, error } = useAppSelector(
    (state) => state.cart,
  );
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const placeOrderStatus = useAppSelector((state) => state.orders.loading);

  useEffect(() => {
    const promise = dispatch(getProductsByItems());
    return () => {
      promise.abort(); // Cancel the request if the component unmounts
      dispatch(clearCartProductsFullInfo());
      dispatch(resetOrderPlaceStatus());
    };
  }, [dispatch]);

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
    userAccessToken,
    placeOrderStatus,
    changeQuantityHandler,
    removeCartItemHandler,
  };
};

export default useCart;
