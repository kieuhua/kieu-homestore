import React, {Component} from 'react'
import {HomeStore} from "../data/DataStore"
import * as CartActions from "../data/CartActionCreators"


export class CartDetailsRows extends Component {
    handleChange = (product, event) => {
        HomeStore.dispatch(CartActions.updateCartQuantity({product, quantity: event.target.value}))
    }
    render() {
       // console.log("CartDeatilsRows 8: " + JSON.stringify(this.props.newStore.cart)) 
       if (this.props.newStore === undefined || !this.props.newStore.cart || this.props.newStore.cart.length === 0 ) {  // good for add action
        //console.log("CartDetailsRows, newStore.cart: " + this.props.newStore.cart)    // cart is undefined
        return <tr>
                <td>Your cart is empty</td>
           </tr>
        } else { 
            return <>
               { 
                    this.props.newStore.cart.map((item ) =>  <tr key={item.product.id}>
                            <td><input type="number" value={item.quantity} 
                                onChange={(ev) => this.handleChange(item.product, ev)} /> </td>
                            <td>{item.product.name}</td>
                            <td className="text-right">${item.product.price.toFixed(2)}</td>
                            <td className="text-right">${ (item.quantity * item.product.price).toFixed(2)}</td>
                            <td><button className="btn btn-sm btn-danger" 
                                onClick={() => this.props.removeFromCart(item.product)}> remove</button></td>
                        </tr>
                    ) 
                }
                <tr>
                    <th colSpan="3" className="text-right">Total:</th>
                    <th colSpan="2" >${ this.props.newStore.cartPrice.toFixed(2) }</th>
                </tr>
            </>
        } 
    }
}