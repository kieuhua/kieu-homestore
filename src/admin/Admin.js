import React, { Component} from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider} from "react-apollo"
import {GraphQlUrl} from "../data/Urls"
import { OrdersConnector} from "./OrdersConnector"
import { Route, Redirect, Switch} from "react-router-dom"
import { ToggleLink} from "../ToggleLink";
//import {ConnectedProducts} from "./ProductsConnector"
//import {ProductEditor} from "./ProductEditor"
//import {ProductCreator} from "./ProductCreator"
//import {AuthPrompt} from "../auth/AuthPrompt";
import { authWrapper} from "../auth/AuthWrapper";

// user = "admin" pw= "secret"

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
        return <ApolloProvider client={this.client}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col bg-info text white"> 
                        <div className="navbar-brand">Kieu HOME STORE</div>
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
                            {/* !this.props.isAuthenticated && 
                                <Route component={AuthPrompt} /> */
                            }
                            <Route path="/admin/orders" component={OrdersConnector} />
                            
                            <Redirect to="/admin/orders"  />
                        </Switch>
                    </div>
                </div>
            </div>
        </ApolloProvider>
    }
})