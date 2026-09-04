import { configureStore, combineReducers } from "@reduxjs/toolkit";
//Reduix Persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage"; // defaults to localStorage for web
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

//Slices of Sotres
import categoriesReducer from "../features/categories/categoriesSlice";
import productsReducer from "../features/product/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";

// const rootPersistConfig = {
//   key: "root", // key for every config because I can have muliple config
//   storage, // how I store/cash (localStorage for web)
//   whitelist: ["cart"], // What I will store
// };

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  wishlist: wishlistReducer,
});

// const persistedReducer = persistReducer(cartPersistConfig, rootReducer);

const store = configureStore({
  // reducer: {
  //   categories: categoriesReducer,
  //   products: productsReducer,
  //   cart: cartReducer,
  // },
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
