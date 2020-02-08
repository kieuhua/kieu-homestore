import React, { Component} from 'react';
import ApolloClient from "apollo-boost"
import {ApolloProvider} from "react-apollo"
import {GraphQlUrl} from "./data/Urls"
//import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import {ProductsConnector}  from "./shop/ProductsConnector"

const graphQlClient = new ApolloClient({uri: GraphQlUrl})

export default class App extends Component {
  render() {
    return <ApolloProvider client={graphQlClient}>
    
    <Router>
      <Switch>
        <Route path="/shop" component={ ProductsConnector} />
        <Redirect to="/shop" />
      </Switch>
    </Router>
    </ApolloProvider>
  }
}

