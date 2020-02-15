import React, {Component} from "react"
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {ProductsTable} from "./ProductsTable"

import {CartDetails} from "./CartDetails"
import * as CartActions from "../data/CartActionCreators"
import {Checkout} from "./Checkout"
import {Thanks} from "./Thanks"

import {HomeStore} from "../data/DataStore"


function mapStateToProps (state, ownProps) {
    //console.log(state) // => newStore  arguments[0] = state
    return {
        //nameAsProps: state.newStore
        newStore: state.newStore
    }
}     

// should return ["cart":..]
const mapDispatchToProps = { ...CartActions}        //k this is important change, don't change it
/*
const mapDispatchToProps = {
    loadData, addToCart, updateCartQuantity, removeFromCart, clearCart, placeOrder
}*/


const filterProducts = (products=[], category) => 
    (!category || category === 'All')
        ? products : products.filter(p => p.category.toLowerCase() === category.toLowerCase())


export const HomeConnector = connect(mapStateToProps, mapDispatchToProps) (
    class extends Component {
        // ...args is [{product}], array of one obj(product)
        constructor(props) {
            super(props)
            this.state = {newStore: {kieu: 45}}
        }
        addToCart(...args) {
           HomeStore.dispatch(CartActions.addToCart(args))  // this works
        }

        render() {
            // check for pageSize here
            //console.log("HomeConnector pagesize 1: " + this.props.pageSize)     //HomeConnector pagesize 1: 25
            //console.log("HomeConnector pagesize 2: " + this.props.sortKey)     //HomeConnector pagesize 2: name

            return <div>
                <Router>
                <Route path="/shop/products:category?"
                    render={(routeProps) => 
                        <ProductsTable {...this.props} {...routeProps}  navigateToPage= {this.props.navigateToPage}
                            pageCount={this.props.totalSize} addToCart = {this.addToCart}
                            products= {filterProducts(this.props.products, routeProps.match.params.category) }
                        />
                    }
                />
                <Route path="/shop/cart" render= {(routeProps) => 
                        <CartDetails {...this.props} {...routeProps} cart={ this.props.newStore} updateCartQuantity={ CartActions.updateCartQuantity}   />  } /> 
                <Route path="/shop/checkout" render={routeProps => <Checkout newStore={this.props.newStore} {...this.props} {...routeProps } /> } />
                <Route path="/shop/thanks" render={routeProps => <Thanks {...this.props} {...routeProps } />} />
                <Redirect to="/shop/products" />
                    
                </Router>
            </div>
        }
    }
)