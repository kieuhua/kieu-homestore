import React, {Component} from "react"
import {Route, Link} from 'react-router-dom'

export class ToggleLink extends Component {
    /* it look at the url, it is same as to then it is active link
        then Link should show primary color */
    render() {
        return <Route path={this.props.to} exact={this.props.exact} 
            children = { routeProps => {
                const baseClasses = this.props.className || "m-2 btn btn-block";
                const activeClass = this.props.activeClass || "btn-primary"
                const inActiveClass = this.props.inActiveClass || "btn-secondary"
                const combinedClasses = `${baseClasses} ${routeProps.match ? activeClass : inActiveClass}`
                console.log("ToggleLink  " + combinedClasses +" match " + routeProps.match)
                // => match = null
                return <Link to={this.props.to} className={combinedClasses}>
                    {this.props.children}
                </Link>
            }}
        />

    }
}