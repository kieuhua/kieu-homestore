import React, { Component} from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider} from "react-apollo"
import {GraphQlUrl} from "../data/Urls"
import { OrdersConnector} from "./OrdersConnector"
import { Route, Redirect, Switch} from "react-router-dom"
import { ToggleLink} from "../ToggleLink";
import {ConnectedProducts} from "./ProductsConnector"
import {ProductEditor} from "./ProductEditor"
import {ProductCreator} from "./ProductCreator"
import {AuthPrompt} from "../auth/AuthPrompt";
import { authWrapper} from "../auth/AuthWrapper";

import '../App.css'

// user = "admin" pw= "abc123"

//const graphQlClient = new ApolloClient({ uri: GraphQlUrl});  // ...3500/grahql

//export class Admin extends Component {
    // access to GQL client features through <ApolloProvider>
    //k now we have more routes, before we have only one route /admin
    // col-3 3 in 12, p-2 padding 2
export const Admin = authWrapper(class extends Component {
    
    constructor(props) {
        super(props);
        this.client = new ApolloClient({
            uri: GraphQlUrl,
            request: gqloperation => gqloperation.setContext({
                headers: { Authorization: `Bearer<${this.props.webToken}>`},                
            })
        })
    }

    render() {
        //return <ApolloProvider client={graphQlClient}>
        /* these two paths /admin/products/create and /admin/products/:id should be 
         before the /admin/products, bc the specific path should be before the general path
         */
        return <ApolloProvider client={this.client}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col bg-info App-header">
                        <div className="kieu-navbar-brand text-success font-weight-bold">Kieu HOME STORE</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 p-2">
                        <ToggleLink to="/admin/orders">Orders</ToggleLink>
                        <ToggleLink to="/admin/products">Products</ToggleLink>
                        { this.props.isAuthenticated && 
                            <button onClick={this.props.signout} 
                                className="btn btn-block btn-secondary m-2 fixed-bottom col-3">
                                Log Out
                            </button> 
                        }
                    </div>
                    <div className="col-9 p-2">
                        <Switch>
                            {/* Route component w/o a path property will always display its component 
                                and can be used with a Switch to prevent other Route components
                                from being evaluated */
                            }
                            { !this.props.isAuthenticated && 
                                <Route component={AuthPrompt} /> 
                            }
                            <Route path="/admin/products/create" component={ProductCreator} />
                            <Route path="/admin/products/:id" component={ProductEditor}  />
                            <Route path="/admin/orders" component={OrdersConnector} />
                            <Route path="/admin/products" component={ConnectedProducts} />
                          
                            <Redirect to="/admin/orders"  />
                        </Switch>
                    </div>
                </div>
            </div>
        </ApolloProvider>
    }
})