import React, {Component} from "react"
import {Query} from "react-apollo"
import {ProductCreator} from "./ProductCreator"
import {product} from "./clientQueries"

export class ProductEditor extends Component {
    render = () => {
        // I was this, id =9, so ..match.params.id works
        console.log("I am in ProductEditor: id " + this.props.match.params.id)    
        return <Query query={product} variables={ {id: this.props.match.params.id }}>
            { ({ loading, data}) => {
                if (!loading) {
                    console.log("ProductEditor, after loading") // don't see this
                    return <ProductCreator {...this.props} product={data.product} mode="edit" />
                }
                // k this is important, if it is loading return null
                return null;
            }}
        </Query>
    }
}