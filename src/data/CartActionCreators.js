import {ActionTypes} from "./Types"

//k Action creator return an object, that object has type property
export const addToCart = (product, quanity) => ({
    type: ActionTypes.CART_ADD,
    payload: {
        product,
        quantity: quanity || 1
    }
})
export const updateCartQuantity = (product, quantity) => ({
    type: ActionTypes.CART_UPDATE,
    payload: {product}
})
export const removeFromCart = (product) => ({
    type: ActionTypes.CART_REMOVE,
    payload: product
})
export const clearCart = () => ({
    type: ActionTypes.CART_CLEAR
})