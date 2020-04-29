import React, {Component} from "react"
import {Link} from "react-router-dom"
import {PaginationControls} from "../PaginationControls"
import { ProductsRow} from "./ProductsRow"

//.p-2 	 classes that set padding
export class ProductsTable extends Component {
    render = () => {
        //console.log("ProductsTable: " + this.props.totalSize)
        return <div>
            <h4 className="bg-info text-white text-center p-2">{this.props.totalSize} Products</h4>
            <PaginationControls keys={["ID", "Name", "Category"]} { ...this.props} />
            <table className="table table-sm table-stripped">
                <thead>
                    <th>Id</th><th>Name</th><th>Category</th>
                    <th className="text-right">Price</th><th className="text-center"></th>
                </thead>
                <tbody>
                    {this.props.products.map( prod => 
                        <ProductsRow key={prod.id} product={prod} deleteProduct={this.props.deleteProduct} />
                    )}
                </tbody>
            </table>
            <div className="text-center">
                <Link to="/admin/products/create" className="btn btn-primary">Create Product</Link>
            </div>
        </div>
    }
}