import React, {Component} from "react";
import {PaginationControls} from "../PaginationControls";
import { ProductsRow} from "./ProductsRow";

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

    
    render = () => 
        <div>
            <h4 className="bg-info text-white text-center p-2">{this.props.totalSize} Products</h4>
            <PaginationControls keys={["ID", "Name", "Category"]} { ...this.props }/>
            <table className="table table-sm table-stripped">
                <thead>
                    <th>Name</th><th>Description</th><th>Category</th>
                    <th className="text-right">Price</th><th className="text-center"></th>
                </thead>
                <tbody>
                    {this.props.products.map( prod =>
                        <ProductsRow key={prod.id} product={prod} addToCart={this.handleAddToCart} />
                    )}
                </tbody>
            </table>
          
        </div>
}