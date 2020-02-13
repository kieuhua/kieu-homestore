import React, { Component } from "react";

export class ProductsRow extends Component {
    
    render = () => 
        <tr>
            <td>{this.props.product.name}</td>
            <td>{this.props.product.description}</td>
            <td>{ this.props.product.category }</td>
            <td className="text-right">
                ${ this.props.product.price.toFixed(2) }
            </td>
            <td>
                <button className="btn btn-success btn-sm float-rigth"
                    onClick={() => this.props.addToCart(this.props.product)}>Add To Cart</button>
            </td>
        </tr>
}
