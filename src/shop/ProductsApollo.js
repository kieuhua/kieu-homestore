import React, {Component} from "react"
import ApolloClient from "apollo-boost"
import {ApolloProvider} from "react-apollo"
import {GraphQlUrl} from "../data/Urls"
import { ProductsConnector } from "./ProductsConnector"

export class ProductsApollo extends Component {
    constructor(props) {
        super(props)
        /* bc I use "apollo-boost" I get some default configuration */
        this.client = new ApolloClient({ uri: GraphQlUrl})
    }
    render() {
        return <ApolloProvider client={this.client}>
           <ProductsConnector  store = {this.props.store}   />
        </ApolloProvider>
    }
}