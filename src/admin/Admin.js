import React, {Component } from "react"
import ApolloClient from "apollo-boost"
import {ApolloProvider} from "react-apollo"
import { authWrapper} from "../auth/AuthWrapper"
import { AuthPrompt} from "../auth/AuthPrompt"
import { GraphQlUrl } from "../data/Urls"
import { ToggleLink } from "../ToggleLink"

import { Route, Redirect, Switch} from "react-router-dom"
//import { ProductsConnector } from "../shop/ProductsConnector"
import { OrdersConnector } from "./OrdersConnector"

//import { ConnectedProducts} from "./ProductsConnector"


// user = "admin" pw= "secret"

//const graphQlClient = new ApolloClient({ uri: GraphQlUrl});  // ...3500/grahql

//export class Admin extends Component {
    // access to GQL client features through <ApolloProvider>
    //k now we have more routes, before we have only one route /admin

//export const Admin = <h4>Kieu </h4>
export const Admin = authWrapper(class extends Component {
    constructor(props) {
        super(props);
        this.client = new ApolloClient({
            uri: GraphQlUrl,
            request: gqloperation => gqloperation.setContext({
                headers: { Authorization: `Bearer<${this.props.webToken}`}
            })
        })
    }
    render() {
         //return <ApolloProvider client={graphQlClient}>
         return <ApolloProvider client={this.client}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col bg-info text white">
                        <div className="navbar-brand">Kieu Home Store</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 p-2">
                        <ToggleLink to="/admin/orders">orders</ToggleLink>
                        { /* <ToggleLink to="/admin/products">Products</ToggleLink> */ }
                        { this.props.isAuthenticated &&
                            <button onClick={this.props.signout}
                                className="btn btn-block btn-secondary m-2 fixed-bottom col-3"> Log Out</button>
                        }
                    </div>
                    <div className="col-9 p-2">
                        <Switch>
                            {/* Route component w/o a path property will always display its component 
                                and can be used with a Switch to prevent other Route components
                                from being evaluated */
                            }
                            {  !this.props.isAuthenticated && <Route component={AuthPrompt} /> }
                            <Route path="/admin/orders" component={OrdersConnector} />
                            { /*<Route path="/admin/products" component={ConnectedProducts} /> */ }
                            {/*
                            <Route path="/admin/products/create" component={ProductsConnector} />
                            <Route path="/admin/products/:id" component={ProductEditor} />
                            <Route path="/admin/products" component={ConnectedProducts} />
                            */}
                            <Redirect to="/admin/orders" />
                        </Switch>
                    </div>
                </div>
            </div>
         </ApolloProvider>
    }
})

  
   