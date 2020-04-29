import React, {Component} from 'react'
import {ValidationError} from "./ValidationError";  // used in renderElement
import { GetMessages} from "./ValidationMessages"; // used in handleSubmit()

export class ValidatedForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            validationErrors: {}
        }
        //k this local variables to save ref of each elem in the form
        this.formElements = {}      // is filled by element name, used by registerRef
    }
    /*
        The submit callback will not be invoked unless all of 
        the elems meet their validation contraints.
        When the submit callback is invoked, it will receive an object 
        whose properties are the name attribute values for the form elems
        and whose values are the data entered into each field by the user.
    */
   handleSubmit = () => {
       console.log("ValidateForm: begining")
       this.setState(state => {
            const newState = {...state, validationErrors: {} } // reset error obj
            //console.log("ValidatedForm handleSubmit formElements 1: "+ this.formElements["name"] ) 
            // => ValidatedForm handleSubmit formElements: [object HTMLInputElement]

            Object.values(this.formElements).forEach(elem => {
                // this html5 api checkValidity(), not using validator package in chp15 React Pro 16
                if (!elem.checkValidity()) {
                    // elem is ref, ref["name"] => "email", "city", "address", "country"
                    console.log("ValidatedForm handleSubmit elem: "+ elem["name"] ) 

                   newState.validationErrors[elem.name] = GetMessages(elem)
                }
            })
            return newState;
            }, () => {      // callback
                if (Object.keys(this.state.validationErrors).length === 0) {
                    // no error, then return each pair of the element and its value into data obj
                    console.log("ValidatedForm handleSubmit formElements 2: "+ this.formElements["name"] ) 
                    //ValidatedForm handleSubmit formElements 2: [object HTMLInputElement]
                    //console.log("ValidatedForm handleSubmit formElements 3: "+ this.formElements["name"]["type"])
                    // ValidatedForm handleSubmit formElements 3: text
                    // merge each form item and its value into data object
                     const data =  Object.assign(...Object.entries(this.formElements)
                        .map(e => {
                            console.log("[e[0]]= " + [e[0]] + " : e[1]= " +e[1].value )
                            //[e[0]]= email : e[1]= kieu1@example.com
                            console.log("e[0]= " + e[0] + " : e[1]= " +e[1].value )
                            //e[0]= email : e[1]= kieu1@example.com
                            return {[e[0]]: e[1].value}
                        }))
                    this.props.submitCallback(data)
                }
                // if error, dodn't call submitCallback(data)
            }
       )
   }

   // k, save ref of element in local variable, not local state
   registerRef = (element) => {
       if (element != null) {
           this.formElements[element.name] = element;
       }
   }

   /* k Each form elem is rendered with a label and a <ValidationError> that 
    that displays validation messages to the user.
    */
   renderElement = (modelItem) => {
        const name = modelItem.name || modelItem.label.toLowerCase()
        //console.log("ValidatedForm renderElement name: "+ name)
        // => name, email, address, city zip,...
       // console.log("ValidatedForm renderElement errors: "+ this.state.validationErrors[name])  // undefined

        return <div className="form-group" key={ modelItem.label }>
            <label>{ modelItem.label }</label>
            <ValidationError errors={ this.state.validationErrors[name] } />
            <input className="form-control" name={ name } ref={ this.registerRef }
                { ...this.props.defaultAttrs } { ...modelItem.attrs } />            
        </div>
   }

   render() {
         /*<ValidatedForm> receives a data model and uses it to create a form that is validated 
        using htm5 api.
        The form is displayed with buttons that cancel or submit the form using callback funcs
        provided as props.
        The submit callback will not be invoked unless all of the elems meet their validation contraints.
        <ValidatedForm formModel= {}  defaultAttrs = {}
		    submitCallback = {} cancelCallback = {}
		    submitText="Place Order" cancelText="Return to Cart"
        />
        */
       //console.log("ValidatedForm formModel: " + JSON.stringify(this.props.formModel))
       //ValidatedForm formModel: [{"label":"Name"},{"label":"Email","attrs":{"type":"email"}},{"label":"Address"},
       //{"label":"City"},{"label":"Zip/Postal Code","name":"zip"},{"label":"Country"}]
       return <>
            { this.props.formModel.map(m => this.renderElement(m))}
            <div className="text-center">
                <button onClick={this.props.cancelCallback}
                    className="btn btn-secondary m-1">{this.props.cancelText || "Cancel"}</button>
                <button onClick={this.handleSubmit} 
                    className="btn btn-primary m-1">{this.props.submitText || "Submit"}</button>
            </div>
       </>

   }
}