import React, {Component} from "react"
import {Link} from "react-router-dom"
//import { ToggleLink} from "../ToggleLink";

//navigate = () => this.props.history.push("/admin/products");
export class ProductsRow extends Component {
      

    deleteProduct = (id) => {
       // console.log("ProductRow, deleteProduct, match.params: " + this.props.match.params)
        this.props.deleteProduct(id)
        // this work but it goes back to /shop/products
        window.location.reload();
        // this didn't re-render the /admin/products page
        // the reason this.deleteProduct() is async
        // so this should be a callback
        //this.setState()
        //this.props.history.push("/admin/products")
        //this.setState({isFlushed: true})
       console.log("ProductsRow, history " + JSON.stringify(this.props.history)) 

    }
    render = () => 
        <tr>
            <td>{this.props.product.id}</td>
            <td>{this.props.product.name}</td>
            <td>{this.props.product.category}</td>
            <td className="text-right">${this.props.product.price.toFixed(2)}</td>
            <td className="text-center">
                <button className="btn btn-sm btn-danger mx-1"
                    onClick={ () => this.deleteProduct(this.props.product.id)}>
                        Delete
                </button>
                <Link to={`/admin/products/${this.props.product.id}`} className="btn btn-sm btn-warning">Edit</Link>
            </td>
        </tr>
}