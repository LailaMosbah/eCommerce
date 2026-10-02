import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { getProductsByCategory } from "@features/product/productsThunks";
import { cleanUpProducts } from "@features/product/productsSlice";

const useProducts = () => {
  const dispatch = useAppDispatch();
  const { prefix } = useParams();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistProductsId = useAppSelector(
    (state) => state.wishlist.productsId,
  );

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistProductsId.includes(el.id),
  }));

  useEffect(() => {
    const promise = dispatch(getProductsByCategory(prefix || ""));
    return () => {
      dispatch(cleanUpProducts());
      promise.abort();
    };
  }, [dispatch, prefix]);

  return { productsFullInfo, loading, error };
  //   return { productsFullInfo, loading, error , prefix };
};

export { useProducts };
