import { createStore, combineReducers } from "redux";
import productsReducer from "./reducer/productsReducer";
import cartReducer from "./reducer/cartReducer";

const root = combineReducers({
    productsReducer,
    cartReducer
});

const store = createStore(root,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;