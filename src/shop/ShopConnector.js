import React, {Component} from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import {Shop} from "./Shop"

const filterProducts = (products=[], category) => 
    (!category || category === 'All')
        ? products : products.filter(p => p.category.toLowerCase() === category.toLowerCase())

export class ShopConnector extends Component {
        render() {
            return <Switch>
                <Route path="/shop/products:category?"
                    render={(routeProps) => 
                        <Shop {...this.props} {...routeProps} 
                            products= {filterProducts(this.props.products, routeProps.match.params.category) }
                        />
                    }
                />
                <Redirect to="/shop/products" />
            </Switch>
        }
    }