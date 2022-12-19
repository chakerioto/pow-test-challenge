import { configureStore } from "@reduxjs/toolkit";
import { dndApiSpell } from "../services/spells";
import { setupListeners } from "@reduxjs/toolkit/query";
import { counterSlice } from "../features/favorites/favoritesSlide";

export const store = configureStore({
  reducer: {
    counterFavorite: counterSlice.reducer,
    [dndApiSpell.reducerPath]: dndApiSpell.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([dndApiSpell.middleware]),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
