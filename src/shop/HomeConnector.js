import React, {Component} from "react"
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {ProductsTable} from "./ProductsTable"

import {CartDetails} from "./CartDetails"
import * as CartActions from "../data/CartActionCreators"
import {Checkout} from "./Checkout"
import {Thanks} from "./Thanks"
import {Admin} from "../admin/Admin"

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
            // console.log("HomeConnector, productsTotal: " + this.props.productsTotal)

            return <div>
                <Router>
                <Route path="/shop/products/:category?"
                    render={(routeProps) => 
                        <ProductsTable {...this.props} {...routeProps}  navigateToPage= {this.props.navigateToPage}
                            pageCount={
                                //k now I understand the this.props.products is just one page from result of graphql
                               // Math.ceil(filterProducts(this.props.products, routeProps.match.params.category).length / this.props.pageSize)
                                //Math.ceil(this.props.products.length / this.props.pageSize)  give me one page
                                this.props.pageCount
                            } 
                            addToCart = {this.addToCart}
                            totalSize={
                              filterProducts(this.props.products, routeProps.match.params.category).length 
                            }
                            products= {    
                                filterProducts(this.props.products, routeProps.match.params.category) 
                                //this.props.products
                            }
                            productsTotal = {this.props.productsTotal}
                        />
                    }
                />
                <Route path="/shop/cart" render= {(routeProps) => 
                        <CartDetails {...this.props} {...routeProps} cart={ this.props.newStore} updateCartQuantity={ CartActions.updateCartQuantity}   />  } /> 
                <Route path="/shop/checkout" render={routeProps => <Checkout newStore={this.props.newStore} {...this.props} {...routeProps } /> } />
                <Route path="/shop/thanks" render={routeProps => <Thanks {...this.props} {...routeProps } />} />
                <Route path="/admin" component={Admin} />
                <Redirect to="/shop/products" />
                    
                </Router>
            </div>
        }
    }
)