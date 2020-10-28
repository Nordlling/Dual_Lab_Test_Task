import { createStore, combineReducers } from "redux";
import usdReducer from "./usd-reducer"
import eurReducer from "./eur-reducer"
import rurReducer from "./rur-reducer"
import datesReducer from "./dates-reducer"


// Редьюсер, который объединяет все отдельные редьюсеры
let reducers = combineReducers({
  usdPage: usdReducer,
  eurPage: eurReducer,
  rurPage: rurReducer,
  datesPage: datesReducer
});

// Хранилище, которое хранит все состояния
let store = createStore(reducers);

window.store = store

export default store;