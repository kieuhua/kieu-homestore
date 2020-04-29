import React, {Component} from 'react'
import { CategoryNavigation} from "./CategoryNavigation"
import { ProductList} from "./ProductList"
import {PaginationControls} from "../PaginationControls"
import {CartSummary} from "./CartSummary"

//const ProductPages = ??

export class Shop extends Component {
    render() {
        //console.log("Shop " + this.props.navigateToPage())
        //console.log("Shop currentPage " + Number(this.props.currentPage))  // NaN
        //console.log("Shop pageCount 2_10_20 " + Number(this.props.pageCount))       // 503
        //console.log("Shop pageSize " + Number(this.props.pageSize))     // 10
        //console.log("Shop categories " + this.props.categories)

        //const { match, history,location} = this.props
        //console.log("Shop match.params: " + JSON.stringify(match.params) )
        //console.log("Shop location: " + location.pathname )
        //console.log("Shop history: " + JSON.stringify(history) )
        return <div className="container-fluid">
            <div className="row">
                <div className="col bg-dark text-success">
                    <div className="navbar-brand">Kieu HOME STORE</div>
                    <CartSummary {...this.props} />
                </div>
            </div>
            <div className="row">
                <div className="col-3 p-2">
                    <CategoryNavigation baseUrl="/shop/products" categories={this.props.categories} />
                </div>
                <div className="col-9 p-2">
                <PaginationControls pageCount={this.props.pageCount}  currentPage={this.props.currentPage} 
                {...this.props} 
                />
                <ProductList products={this.props.products} />
                </div>
            </div>
        </div>
    }
}