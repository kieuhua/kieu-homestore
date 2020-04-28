import React, {Component} from "react";
/*
<OrdersRow key={order.id} toggleShipped={ () => 
    this.props.toggleShipped(order.id, !order.shipped) }
/>
*/
export class OrdersRow extends Component {
    //array1.reduce(reducer)
    //const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // reducer = (total,p) => total += p.quanity * p.product.price, 
    // initital value = 0
    calcTotal = (products) => products.reduce(
        (total,p) => total += p.quantity * p.product.price, 0).toFixed(2);
    
    getShipping = (order) => order.shipped ? <i className="fa fa-shipping-fast text-success" />
        : <i className="fa fa-exclamation-circle text-danger" />

    render = () => 
        <tr>
            <td>{ this.props.order.id}</td>
            <td>{ this.props.order.name}</td>
            <td>{ this.props.email}</td>
            <td className="text-right">${this.calcTotal(this.props.order.products)}</td>
            <td className="text-center">
                <button onClick={this.props.toggleShipped} className="btn btn-sm-btn-block bg-muted">
                    {this.getShipping(this.props.order)}
                    <span>{this.props.order.shipped ? " Shipped" : " Pending"}</span>
                </button>
            </td>
        </tr>
}