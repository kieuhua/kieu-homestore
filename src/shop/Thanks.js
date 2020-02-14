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
            <div className="col bg-dark text-white">
                <div className="navbar-brand">HOME STORE</div>
            </div>
            <div>
                <h2>Thanks!</h2>
                <p>Thanks for placing your order.</p>              
                <p>We'll ship your goods as soon as possible.</p>
                <Link to="/shop/products" className="btn btn-primary">Return to Store</Link>
            </div>
        </div>
    }
}