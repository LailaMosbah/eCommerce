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
import authReducer from "@features/auth/authSlice";

// const rootPersistConfig = {
//   key: "root", // key for every config because I can have muliple config
//   storage, // how I store/cash (localStorage for web)
//   whitelist: ["cart"], // What I will store
// };

const rootPersistConfig = {
  key: "root", // key for every config because I can have muliple config
  storage, // how I store/cash (localStorage for web)
  whitelist: ["cart", "auth"], // What I will store
};

const authPersistConfig = {
  key: "auth",
  storage,
  whiteList: ["user", "accessToken"],
};
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

// const wishlistPersistConfig = {
//   key: "wishlist",
//   storage,
//   whitelist: ["productsId"],
// };

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  categories: categoriesReducer,
  products: productsReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  // wishlist: persistReducer(wishlistPersistConfig, wishlistReducer),
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  // reducer: {
  //   categories: categoriesReducer,
  //   products: productsReducer,
  //   cart: cartReducer,
  // },
  reducer: persistedReducer,
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
