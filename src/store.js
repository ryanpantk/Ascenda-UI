import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './middleware/ReduxReducers';

export const store = configureStore({ reducer: rootReducer },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
