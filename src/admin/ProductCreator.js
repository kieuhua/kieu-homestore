import React, {Component} from "react"
import {ValidatedForm} from "../forms/ValidatedForm";
import {Mutation} from "react-apollo"
import {storeProduct, updateProduct} from "./clientMutations"

/* if edit mode fill out this.formModel with product info in the constructor;
otherwise displays an empty form, use <VidatedForm> display
the form with submit and cancel btn, and validate each field
*/
export class ProductCreator extends Component {
    constructor(props) {
        super(props)
        this.defaultAttrs = {type: "text", required: true}
        this.formModel = [
            {label: "Name"}, {label: "Description"}, {label: "Category"},
            {label: "Price", attrs: { type: "number"}}
        ]
        this.mutation = storeProduct
        if (this.props.mode === "edit") {
            this.mutation = updateProduct;
            // fill formModel with defaultValues from the product
            //k each field, its defaultValue is product["price"], product["id"], product["name"],...
            // 
            this.formModel = [ {label: "Id", attrs: { disabled: true }}, ...this.formModel ]
                .map(item => ({ ...item, attrs: { ...item.attrs, 
                    defaultValue: this.props.product[item.label.toLowerCase()]} }))
        }
    }

    navigate = () => {
        console.log("ProductCreator, navigate, path: ", this.props.path) // undefine
        console.log("ProductCreator, navigate, match: ", this.props.match.params) // {id: 5 }
        this.props.history.push("/admin/products");
    }

    /* the result from Mutation is in childern, called render component pattern
    so saveMuation and {client} are result from Mutation query 
   As a simpler alternative, I have received a client parameter from the render prop func, 
   which allows me to clear the cached data through its resetStore method. 
    When the navigate func sends the browser back to the product list a fresh GQL 
    will be sent to the server, which ensures that the data is consistently paged and sorted, 
    albeit at the cost of an additional query
    */
    /* k  { ...data, price: Number(data.price) }}}); 
      we need price price convert to number, be it may be string not sure ??
   */
    render = () => {
        return <div className="container-fluid">
            <div className="row">
                <div className="col bg-dark text-white">
                    <div className="navbar-brand">Kieu HOME STORE</div>
                </div>
            </div>
            <div className="row">
                <div className="col m-2">
                    <Mutation mutation={this.mutation}>
                        { (saveMutation, {client}) => {
                            return <ValidatedForm formModel={this.formModel} defaultAttrs={this.defaultAttrs}
                                        submitCallback={ data => {
                                            saveMutation({variables: { product: {...data, price: Number(data.price) }}});
                                            // if create a new product, clear the cache
                                            if (this.props.mode !== "edit") {client.resetStore(); } 
                                            this.navigate()     // re-render the admin products list    
                                        }}
                                        cancelCallback={this.navigate}
                                        submitText="Save"cancelText="Cancel" />
                        }}
                    </Mutation>
                </div>
            </div>
        </div>
    }
}