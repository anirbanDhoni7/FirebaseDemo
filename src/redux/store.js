import { createStore } from "redux";
import rootReducer from "./rootReducer";
import productSaga from "./ProductSaga";
import { createSagaMiddleware } from 'redux-saga';
import { configureStore } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: () => [sagaMiddleware]
});

sagaMiddleware.run(productSaga);
export default store;