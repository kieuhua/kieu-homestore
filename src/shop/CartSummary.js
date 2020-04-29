import React, {Component} from "react"
import {Link} from "react-router-dom"

export class CartSummary extends Component {
    getSummary = () => {
        if ( this.props.newStore !== undefined &&  this.props.newStore.cartItems > 0 ) {
        // if ( this.props.newStore.cartItems > 0 ) { => TypeError: Cannot read property 'cartItems' of undefined
            //console.log("CartSummary, cartItems: " + this.props.newStore.cartItems)
            return <span className="text-dark">
                {this.props.newStore.ComponentcartItems} item(s),
                ${this.props.newStore.cartPrice.toFixed(2)}
                <span>  </span>
            </span>
        } else {
            return <span className="text-dark">Your cart: (empty) </span>
        }
    }
    getLinkClasses = () => {
        //console.log("CartSummary, cartItems 1: " + JSON.stringify(this.props.newStore))
        if (this.props.newStore !== undefined) {
            //console.log("CartSummary, cartItems 2: " + this.props.newStore.cartItems)
        }
        return `btn btn-sm bg-dark text-white
            ${(this.props.newStore === undefined || this.props.newStore.cartItems === 0) ? "disabled" : "" }`
    }
    render() {
        return <div className="float-right">
            <small>
                {this.getSummary()}
                <Link className={this.getLinkClasses() } to="/shop/cart">
                    <i className="fa fa-shopping-cart">  </i>
                </Link>
            </small>
        </div>
    }
}