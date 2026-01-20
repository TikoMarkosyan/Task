import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import rewardsReducer from "./slices/rewardsSlice";

export const store = configureStore({
  reducer: {
    rewards: rewardsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
