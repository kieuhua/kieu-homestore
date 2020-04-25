import React, {Component} from "react"
import Axios from "axios"
import {AuthContext} from "./AuthContext"
import {authUrl} from "../data/Urls"

export class AuthProviderImpl extends Component {
    constructor(props) {
        super(props)
        this.state = { isAuthenticated: false, webToken: null}
    }
    /* uses the Axios to send a POST request to validate credentials
    that credentials will be obtained from the user.
    the result is a Pomise => success or reject
    */
    authenticate = (credentials) => {
        return Axios.post(authUrl, credentials).then(response => {
            if (response.data.success === true) {
                this.setState({
                    isAuthenticated: true,
                    webToken: response.data.token
                })
                return true;
            } else {
                throw new Error("Invalid Credentials")
            }
        })
    }
    signout = () => {
        this.setState({isAuthenticated: false, webToken: null })
    }
    /* <AuthProviderImpl> through value prop
     to share access to state data, authenticate and signout methods
     directly to any descendant component
    */
    render = () => 
        <AuthContext.Provider value={ {...this.state, authenticate: this.authenticate, signout: this.signout}}>
            {this.props.children}
        </AuthContext.Provider>
}