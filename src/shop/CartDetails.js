import React, {Component} from "react"
import {Link} from "react-router-dom"
import { CartDetailsRows} from "./CartDetailsRows"
//import {HomeStore} from "../data/DataStore"
//import * as CartActions from "../data/CartActionCreators"


export class CartDetails extends Component {
    //getLinkClasses = () => `btn btn-secondary m-1 ${this.props.cartItems === 0 ? "disabled" : "" }`
    getLinkClasses = () => `btn btn-secondary m-1 ${this.props.newStore.cartItems === 0 ? "disabled" : "" }`
    render() {
        //console.log("kieu CartDetails: " + JSON.stringify(CartActions.updateCartQuantity({}, 4)))

        return <div className="m-3">
            <h2 className="text-center kieu-navbar-brand text-success font-weight-bold App-header">Your Cart</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Product</th>
                        <th className="text-right">Price</th>
                        <th className="text-right">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <CartDetailsRows newStore={this.props.newStore} 
                        cart={this.props.newstore}
                        cartPrice={this.props.cartPrice}
                        updateQuantity={this.props.updateCartQuantity}
                        removeFromCart ={this.props.removeFromCart}
                    />
                </tbody>
            </table>
            <div className="text-center">
                <Link className="btn btn-primary m-1" to="/shop/products">Continue Shopping</Link>
                <Link className={this.getLinkClasses()} to="/shop/checkout">Checkout</Link>
            </div>
        </div>
    }
}