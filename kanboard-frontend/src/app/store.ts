import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import kanboardReducer from '../slices/kanboard/kanboardSlice';

export const store = configureStore({
  reducer: {
    kanboard: kanboardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
