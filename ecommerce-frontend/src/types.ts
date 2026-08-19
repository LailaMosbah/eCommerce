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
  price: string;
  cat_prefix: string;
  img: string;
  quantity?: number;
  max_quantity: number;
}

interface ProductsState {
  records: Product[];
  loading: Loading;
  error: string | null;
}

export type { Loading, Category, CategoriesState, Product, ProductsState };
