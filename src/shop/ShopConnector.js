import React, {Component} from "react"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Shop} from "./Shop"

const filterProducts = (products=[], category) => 
    (!category || category === 'All')
        ? products : products.filter(p => p.category.toLowerCase() === category.toLowerCase())

export class ShopConnector extends Component {
        //navigateToPage =  (page) => this.props.history.push(`/shop/products/${this.props.match.params.category}/${page}`)
       // navigateToPage =  (page) => this.props.history.push(`/shop/products/${this.props.match.params}/${page}`)
        
        render() {
            console.log("ShopConnect totalSize " + this.props.totalSize) // 503
            console.log("ShopConnect " + this.props.location.pathname)
            
            let currentPage = Number(this.props.match.params.page) 
            if (isNaN(currentPage)) { currentPage = 1 }

            console.log("ShopConnect 2_10_20 currentPage: " + currentPage)
        
            
            console.log("ShopConnector 2_10_20: " + currentPage)  // NaN
            console.log("ShopConnector productsCategory: 2_10_20: " + this.props.productsCategory)  // undefined
            console.log("ShopConnector productsCategory: 2_10_20 pageSize: " + this.props.pageSize)  // 10
            console.log("ShopConnector productsCategory: 2_10_20 sortKey: " + this.props.sortKey)  // id
            console.log("ShopConnector productsCategory: 2_10_20 currentPage: " + this.props.currentPage)  // 1

            //const { match, history,location} = this.props
            //console.log("ShopConnector match.params: " + JSON.stringify(match.params) )
            //console.log("ShopConnector location: " + location.pathname )
            //console.log("ShopConnector history: " + JSON.stringify(history) )
            // => history: {"length":3,"action":"POP","location":{"pathname":"/shop/products","search":"","hash":"","key":"6ei9qt"}}
            
            return  <Router>
            
           
                <Route path="/shop/products:category?"
                    render={(routeProps) => 
                        <Shop {...this.props} {...routeProps} currentPage={currentPage} navigateToPage= {this.navigateToPage}
                            pageCount={this.props.totalSize}
                            products= {filterProducts(this.props.products, routeProps.match.params.category) }
                        />
                    }
                />
            
     
            </Router>
        }
    }