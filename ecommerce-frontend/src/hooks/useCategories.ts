import { useEffect } from "react";

// Reduix
import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
  getCategories,
  cleanUpCategories,
} from "@features/categories/categoriesSlice";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.categories,
  );

  // Dispatch مرة واحدة فقط
  useEffect(() => {
    dispatch(getCategories());
    return () => {
      dispatch(cleanUpCategories());
    };
  }, [dispatch]);

  return { records, loading, error };
};

export default useCategories;
