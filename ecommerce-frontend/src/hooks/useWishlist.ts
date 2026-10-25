import { useEffect } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getWishlistProducts,
  cleanUpWishlistProductsFullInfo,
} from "../features/wishlist/wishlistSlice";

const useWishlist = () => {
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.wishlist);
  const productsFullInfo = useAppSelector(
    (state) => state.wishlist.productsFullInfo,
  );

  useEffect(() => {
    const promise = dispatch(getWishlistProducts("productsFullInfo"));
    return () => {
      promise.abort();
      dispatch(cleanUpWishlistProductsFullInfo());
    };
  }, [dispatch]);

  const productsInWishlistFullInfo = productsFullInfo.map((el) => ({
    ...el,
    quantity: el.quantity || 0,
    isLiked: true,
    isAuthenticated: true,
  }));

  return { productsInWishlistFullInfo, loading, error };
};

export default useWishlist;
