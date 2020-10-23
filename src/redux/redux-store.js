import { createStore, combineReducers } from "redux";
import usdReducer from "./usd-reducer"
import eurReducer from "./eur-reducer"
import rurReducer from "./rur-reducer"
import datesReducer from "./dates-reducer"



let reducers = combineReducers({
  usdPage: usdReducer,
  eurPage: eurReducer,
  rurPage: rurReducer,
  datesPage: datesReducer
});

let store = createStore(reducers);

window.store = store

export default store;