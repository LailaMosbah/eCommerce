import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
  actGetOrders,
  resetOrderPlaceStatus,
} from "@features/orders/ordersSlice";
import type { Product } from "../types";

const useOrders = () => {
  const dispatch = useAppDispatch();

  const { loading, error, orderList } = useAppSelector((state) => state.orders);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);

  const viewDetailsHandler = (id: number) => {
    const productDetails = orderList.find((order) => order.id === id);
    const newItems = productDetails?.items ?? [];

    setShowModal(true);
    setSelectedProduct((prev) => [...prev, ...newItems]);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());

    return () => {
      promise.abort();
      dispatch(resetOrderPlaceStatus());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    orderList,
    showModal,
    selectedProduct,
    viewDetailsHandler,
    closeModalHandler,
  };
};

export default useOrders;
