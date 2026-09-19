type Loading = "idle" | "pending" | "succeeded" | "failed";

interface Category {
  id: number;
  title: string;
  prefix: string;
  img: string;
}

interface CategoriesState {
  records: Category[];
  loading: Loading;
  error: string | null;
}

interface Product {
  id: number;
  title: string;
  price: number;
  cat_prefix: string;
  img: string;
  quantity?: number;
  max_quantity: number;
  isLiked?: boolean;
}

interface ProductsState {
  records: Product[];
  loading: Loading;
  error: string | null;
}

interface WishListState {
  productsId: number[];
  error: string | null;
  loading: Loading;
  productsFullInfo: Product[];
}

export type {
  Loading,
  Category,
  CategoriesState,
  Product,
  ProductsState,
  WishListState,
};
