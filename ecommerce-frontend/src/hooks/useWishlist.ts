import { useEffect } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getWishlistProducts,
  cleanUpWishlistProductsFullInfo,
} from "../features/wishlist/wishlistSlice";

const useWishlist = () => {
  const dispatch = useAppDispatch();

  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlist,
  );

  // Get current cart quantities
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const promise = dispatch(getWishlistProducts("productsFullInfo"));

    return () => {
      promise.abort();
      dispatch(cleanUpWishlistProductsFullInfo());
    };
  }, [dispatch]);

  const productsInWishlistFullInfo = productsFullInfo.map((product) => ({
    ...product,
    quantity: cartItems[product.id] || 0,
    isLiked: true,
    isAuthenticated: true,
  }));

  return { productsInWishlistFullInfo, loading, error };
};

export default useWishlist;
