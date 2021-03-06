import React, {Component} from "react"
import {ValidatedForm} from "../forms/ValidatedForm"

import {Mutation} from "react-apollo"
import {storeOrder} from "./clientMutations"

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
        this.mutation = storeOrder;
    }

     /* handleSubmit() will be invoked when the user submits valid form data.
    This method receives the form data and combines it with details of the user's cart
    before calling placeOrder and clearCart action creators and 
    then navigating toe /shop/thanks URL
    */
   // k formData is passed from <ValidatedForm>
   // this.props.submitCallback(data);

   /*
   handleSubmit = (formData) => {
       const order = {...formData,
            products: this.props.newStore.cart.map(item => ({ quantity: item.quantity, product_id: item.product.id}))}
    
        console.log("Checkout handleSubmit order 2 " +  JSON.stringify(order))  // undefined
        //Checkout handleSubmit order 2 {"name":"Kieu Hua","email":"kieu.hua@gmail.com",
        //"address":"77 Strawberry Hill Road","city":"Acton","zip":"01720","country":"United States",
        //"products":[{"quantity":1,"product_id":"4"}]}

        saveMutation({variables: { product: 
            { ...data, price: Number(data.price) }}});

       // this.props.placeOrder(order)
       // this.props.clearCart()
       // this.props.histoory.push("/shop/thanks")


   } */

   handleCancel = () => {
       this.props.history.push("/shop/cart")
   }

   navigate = () => this.props.history.push("/shop/thanks");


   render() {
       /*
        k saveMutation() is where we save the order to the server
       */
       return <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div className="kieu-navbar-brand text-center text-success font-weight-bold App-header">Your Information for Checkout</div>
                </div>
            </div>
            <div className="row">
                <div className="col m-2">
                    <Mutation mutation={this.mutation}>
                        { (saveMutation, {client}) => {
                            // I didn't see console.log in ValidatedForm why???
                            return <ValidatedForm
                                formModel= {this.formModel}     // in constructor just local variable
                                defaultAttrs = {this.defaultAttrs}
                                submitCallback = { data => {
                                    //const data_1 = this.convertData(data)
                                    // data = {}, bc submitCallback async ??
                                   console.log("Checkout 1: " + JSON.stringify(data ))
                                   //Checkout 1: {"name":"Kieu Hua","email":"kieu.hua@gmail.com","address":"77 Strawberry Hill Road","city":
                                   //"Acton","zip":"01720","country":"United States"}
                                  // let newProducts = {products: [{quantity: 1, product_id: 4}]}
                                   //let newProducts = {products: [ ]}
                                   //let newOrder = {...data, newProducts }
                                   //let newOrder = {...data, newProducts }
                                  // const result = saveMutation({variables: { order:  data }})
                                 // let newOrder = { name: "kieu10", email: "kieu10@example.com", address: "777 apple", 
                                 // city: "acton", zip: "92345", country: "USA", shipped: false, 
                                  //let newProducts = [ {quantity: 33, product_id: 40}]
                                  //const order = {...formData, 
                                   let newProducts = this.props.newStore.cart.map(item => ({ quantity: Number(item.quantity), product_id: Number(item.product.id) })) 
                                   console.log("Checkout, submit, newProducts: " + JSON.stringify(newProducts))

                                    //saveMutation({variables: { product: {...data, price: Number(data.price) }}});
                                            //const result = saveMutation({variables: { order:  newOrder }})
                                   const result = saveMutation( {variables: {order:  {...data, products: newProducts }}} )
                                   // it is async, so I don't see checkout 2

                                   // k need to clear the cart here
                                   //k 5_14_20 this is not working
                                   this.props.clearCart()  
                                   console.log("Checkout 2: " + JSON.stringify(result ))
                                    this.navigate()     // re-render list   
                                }}
                                cancelCallback = {this.handleCancel}
                                submitText = "Place Order"
                                cancelText = "Return to Cart"
                                />
                            }
                        }
                    </Mutation>
                </div>
            </div>
       </div>
   }
}
