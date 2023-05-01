import { combineReducers, configureStore } from '@reduxjs/toolkit';
import CheckboxReducer from './slices/checkbox';
import ticketsReducer from './slices/tickets';

const rootReducer = combineReducers({
  checkboxes: CheckboxReducer,
  tickets: ticketsReducer,
});

export const store = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
