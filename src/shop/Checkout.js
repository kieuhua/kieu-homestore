import React, {Component} from "react"
import {ValidatedForm} from "../forms/ValidatedForm"

/*
<Checkout> uses a <ValidatedForm> to present the user with fields 
for their name, email, address. Each form elem will be created with 
the required attr, and the type attr of the input elem 
for the email address is set to email.
These attributes are used by the HTML5 constraint validation API 
and will prevent the user from placing an order unless they provide
a value for all fields and enter a valid email address.
*/
export class Checkout extends Component {
    constructor(props) {
        super(props)
        this.defaultAttrs = {type: "text", required: true}
        // an array of objs, each obj has label property, optional name,or attrs
        this.formModel = [
            {label: "Name"},
            {label: "Email", attrs: { type: "email"}},
            {label: "Address"},
            {label: "City"},
            {label: "Zip/Postal Code", name: "zip"},
            {label: "Country"}
        ]
    }

     /* handleSubmit() will be invoked when the user submits valid form data.
    This method receives the form data and combines it with details of the user's cart
    before calling placeOrder and clearCart action creators and 
    then navigating toe /shop/thanks URL
    */
   handleSubmit = (formData) => {
       console.log("Checkout handleSubmit 1: " + JSON.stringify(formData))
      // Checkout handleSubmit 1: {"name":"Kieu Hua","email":"kieu.hua@gmail.com",
      //"address":"77 Strawberry Hill Road","city":"Acton","zip":"01720","country":"United States"}
       console.log("Checkout handleSubmit 2: " + JSON.stringify(this.props.newStore.cart))
       //Checkout handleSubmit 2: [{"product":{"id":"1","name":"Handcrafted Plastic Shirt","category":"Chess","price":148,
       //"description":"Chess: Nihil non nulla.","__typename":"product"},"quantity":1}]
       const order = {...formData,
            products: this.props.newStore.cart.map(item => ({ quantity: item.quantity, product_id: item.product_id}))}
       // this.props.placeOrder(order)
       // this.props.clearCart()
       // this.props.histoory.push("/shop/thanks")
   }

   handleCancel = () => {
       this.props.histoory.push("/shop/cart")
   }

   render() {
       return <div className="container-fluid">
            <div className="row">
                <div className="col bg-dark text-white">
                    <div className="navbar-brand"> HOME STORE</div>
                </div>
            </div>
            <div className="row">
                <div className="col m-2">
                    <ValidatedForm
                        formModel= {this.formModel}     // in constructor just local variable
                        defaultAttrs = {this.defaultAttrs}
                        submitCallback = {this.handleSubmit}
                        cancelCallback = {this.handleCancel}
                        submitText = "Place Order"
                        cancelText = "Return to Cart"
                    />
                </div>
            </div>
       </div>
   }
}
