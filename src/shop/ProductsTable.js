import React, {Component} from "react";
import {PaginationControls} from "../PaginationControls";
import { ProductsRow} from "./ProductsRow";
import { CategoryNavigation } from "./CategoryNavigation";

import '../App.css'
import { CartSummary } from "./CartSummary";

//.p-2 	 classes that set padding
export class ProductsTable extends Component {
    
    // ...args is array, length= 1. args[0] is product obj
    // product obj = {id,name, category, description, price}
    handleAddToCart = (...args) => {
         //console.log("Shop: " + args.length + args[0].name + args[0].description, args[0].category)
        // Shop: 1P1P1 (waterSports) WaterSports
        // need just one product in array
       this.props.addToCart(...args)
       //this.props.addToCart(product)
        this.props.history.push("/shop/cart")
        //console.log("productsTable: " + this.props.history.length)  // => 13
    }

    
    render = () => {
        //console.log("ProductsTable, productsTotal: " + this.props.productsTotal)
        //console.log("ProductsTable, categoryTotal: " + this.props.categoryTotal)
        const productsSize = this.props.category ? this.props.categoryTotal : this.props.productsAllSize
        return <div className="container-fluid">
            <div className="row">
                <div className="col bg-info App-header-1">
                    <div className="kieu-navbar-brand text-success font-weight-bold text-center">Kieu HOME STORE</div>
                    <div className="float-right">
                        <CartSummary {...this.props} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-3 p-2">
                    <CategoryNavigation baseUrl="/shop/products" categories={this.props.categories} />
                </div>
                <div className="col-9 p-2">
                    <div>
                    <h4 className="bg-info text-white text-center p-2">{productsSize} Products</h4>
                    <PaginationControls keys={["ID", "Name", "Category"]} { ...this.props }/>
                    </div>

                    <table className="table table-sm table-stripped">
                        <thead>
                            <tr>
                            <th>Name</th><th>Description</th><th>Category</th>
                            <th className="text-right">Price</th><th className="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.products.map( prod =>
                                <ProductsRow key={prod.id} product={prod} addToCart={this.handleAddToCart} />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}