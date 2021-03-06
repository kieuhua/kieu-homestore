import React, { Component} from 'react';

//import './App.css';
import {ProductsApollo} from "./shop/ProductsApollo"

import {HomeStore} from "./data/DataStore"
import {Provider} from "react-redux"

import {AuthProviderImpl} from "./auth/AuthProviderImpl"

//const store = createStore(HomeStore)

export default class App extends Component {

  render() {
    return <Provider store={HomeStore}>
      <AuthProviderImpl> 
        <ProductsApollo  />
      </AuthProviderImpl> 
    </Provider>
  }
}

