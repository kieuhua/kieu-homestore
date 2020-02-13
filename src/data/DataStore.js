import {createStore } from "redux"
import { CartReducer} from "./CartReducer"
import { devToolsEnhancer } from 'redux-devtools-extension';

//let newStore = { cart: [], cartItems: 0, cartPrice: 0, ...storeData}

export const HomeStore = createStore(CartReducer,devToolsEnhancer()
    
    )