
// AuthWapper.js llow a component to receive the features in <AuthContext> as props
import React, {Component} from "react"
import { AuthContext } from "./AuthContext";

export const authWrapper = (WrappedComponent) =>
    class extends Component {
        render = () => 
            <AuthContext.Consumer>
                { context => <WrappedComponent {...this.props} { ...context} /> }
            </AuthContext.Consumer>
    }
