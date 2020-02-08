import {createStore } from "redux"
import { ShopReducer} from "./ShopReducer"

export const HomeStoreDataStore = createStore(ShopReducer)