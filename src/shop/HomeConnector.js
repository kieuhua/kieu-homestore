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
                    render={(routeProps) => {
                        //k I don't have products("category"),
                        // I only have the products in this current page, totalSize = 10, CategorySize = 503
                        // bc when I change category, it doesn't go to refech it, so CategorySize is still same
                        
                        // one more thing the this.props.productds continue the same, 10 products of all catories,
                        // for each category, it just filter to get the products for that category
                        // get undefined first, then "bed_bath"
                        console.log("HomeConnector, category, kieu : " + routeProps.match.params.category) // undefined here
                        this.props.navigateToCategory(routeProps.match.params.category)   // this gives bad buttons

                        //k it is better to filter all products on clients side
                        // however when the users change pageSize, and sort may not work
                        // but I can try them anyway
                    
                        console.log("HomeConnector, pageCount: " + this.props.pageCount)
                        console.log("HomeConnector, productsAllSize: " + this.props.productsAllSize)
                        console.log("HomeConnector, products: " + JSON.stringify(this.props.products))  // give me 10 products, pageSize
                        const totalSize = filterProducts(this.props.products, routeProps.match.params.category).length 
                        // totalSize is number of products in this current page, <= pageSize
                        console.log("HomeConnector, totalSize: " + totalSize)   
                        
                        // now need to set the productsTotal
                        const productsTotal = routeProps.match.params.category ? this.props.productsTotal : this.props.productsAllSize
                        return <ProductsTable {...this.props} {...routeProps}  navigateToPage= {this.props.navigateToPage}
                            pageCount={
                                //k now I understand the this.props.products is just one page from result of graphql
                               //Math.ceil(filterProducts(this.props.products, routeProps.match.params.category).length / this.props.pageSize)
                                //Math.ceil(this.props.products.length / this.props.pageSize)  give me one page
                                //this.props.totalSize/ this.props.pageSize
                               // filterProducts(this.props.products, routeProps.match.params.category).length 
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
                            productsTotal = {productsTotal}
                        />
                        }
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