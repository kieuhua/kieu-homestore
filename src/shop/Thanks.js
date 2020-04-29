import React, {Component} from "react"
import {Link} from "react-router-dom"

export class Thanks extends Component {
    /* k
        as now, I dont' know how to get order number, this in <Checkout>
        <Mutation mutation={this.mutation}>
        const result = saveMutation({variables: { order:  data }})  // result {}
        I will ignore this issue for now
        <p>Your order is #{this.props.order ? this.props.order.id : 0}</p>
    */
    render() {
       // console.log("Thanks order: " + JSON.stringify(this.props.order))
        return <div>
            <div className="col">
                <div className="kieu-navbar-brand text-center text-success font-weight-bold App-header">Thank you for shopping</div>
            </div>
            <div className="text-center">
                <h2 className="text-primary">Thanks!</h2>
                <p>Thanks for placing your order.</p>              
                <p>We'll ship your goods as soon as possible.</p>
                <Link to="/shop/products" className="btn btn-primary">Return to Store</Link>
            </div>
        </div>
    }
}