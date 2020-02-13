import React, { Component} from 'react';

//import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import  {ProductsConnector}  from "./shop/ProductsConnector"
import {withRouter} from "react-router-dom"
import {ProductsApollo} from "./shop/ProductsApollo"

import {HomeStore} from "./data/DataStore"
import {Provider} from "react-redux"


class ShowTheLocation extends Component {
  render() {
    const { match, history,location} = this.props
    console.log("showthelocation match.params: " + JSON.stringify(match.params) )
    console.log("showthelocation location: " + location.pathname )
    console.log("showthelocation history: " + JSON.stringify(history) )
    // => {"length":3,"action":"POP","location":{"pathname":"/shop/products","search":"","hash":"","key":"6ei9qt"}}
    return <div> hi kieu </div>
  }
}

const ShowTheLocationWithRouter = withRouter(ShowTheLocation)

//const store = createStore(HomeStore)

export default class App extends Component {

  render() {
    
  console.log("App " + this.props.products)
   
    return <Provider store={HomeStore}>
      <ProductsApollo  />
    </Provider>
  }
}

