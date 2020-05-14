/*
k: this reducer add a cart property to data store,
cart is array of objects that have product, quanity properties.
cart, cartItems and cartPrices properties are same level of products and categrories.

It is important to keep the structure of your data store flat bc changes deep in an object
hierarchy won't be detected and displayed to the user. It is for this reason that 
the cart, cartItems and cartPrice properties are defined alongside 
k: this no lonager true, bc I only store cart, cartItems, cartPrice in storeData in Redux
the products and categories 
in the data store, rather than grouped together into a ingle sturcture.
*/

import {ActionTypes} from "./Types"
import {isEmpty} from "lodash"

export const CartReducer = ( storeData, action) => {
    
   // if ( Object.keys(storeData).length === 0) {
   //if ( storeData == null) {
    let newStore = {};
    // isEmpty() check for empty object
    if ( isEmpty(storeData)) {
        newStore = { cart: [], cartItems: 0, cartPrice: 0}
    } else {
        newStore = Object.assign({},storeData.newStore)
    }//

    //let newStore = { cart: [], cartItems: 0, cartPrice: 0, ...storeData}
   // console.log("CartReducer 14.2: newStore.cart:  " + JSON.stringify(newStore))  //  {}
    
    //let newStore = { cart: [], cartItems: 0, cartPrice: 0, ...storeData}
    switch(action.type) {
        case ActionTypes.CART_ADD:
            const p = action.payload.product[0]
            const q = action.payload.quantity

            let existing = undefined
            if (newStore.cart !== undefined) {
                existing = newStore.cart.find(item => item.product.id === p.id)
            } 
            if (existing) {
                existing.quantity += q
            } else {
                    let product = action.payload.product[0]
                    let quantity = action.payload.quantity
                    if (newStore.cart === undefined) { newStore.cart = []}
                     newStore.cart.push({product: product, quantity: quantity})
            }
            newStore.cartItems += q;        // good
            newStore.cartPrice += p.price * q
           return { newStore};

        case ActionTypes.CART_UPDATE:
            newStore.cart = newStore.cart.map(item => {
                if (item.product.id === action.payload.product.product.id) {
                    const diff = action.payload.product.quantity - item.quantity
                    newStore.cartItems += diff
                    newStore.cartPrice += (item.product.price * diff )
                    return action.payload.product  // payload = {product, quantity}
                } else {
                    return item
                }
            })
            return {newStore}
        case ActionTypes.CART_REMOVE:
            //k what is actipn.payload.is is product.id from the brower, user selection
            let selection = newStore.cart.find(item => item.product.id === action.payload.id)
            newStore.cartItems -= selection.quantity;
            newStore.cartPrice -= selection.quantity * selection.product.price
            // take out the item in payload = {product}
            newStore.cart = newStore.cart.filter(item => item !== selection)
            // this look good the car still have remaining items
           //console.log("CartReducer, CART_REMOVE: " + JSON.stringify(newStore.cart))
           /* k this {newStore} cause me a lot of trouble
                if I retrun newStore  => newStore.cart undefined
                {newStore} is new object with new info
           */
            return {newStore}
            
        case ActionTypes.CART_CLEAR:
            console.log("CartReducer, CART_CLEAR ")
            // return { cart: [], cartItems: 0, cartPrice: 0}
            newStore.cart = []
            newStore.cartItems = 0
            newStore.cartPrice = 0
            return { newStore}
        default:
            // just return empty  storeData
            return {}
    }
}