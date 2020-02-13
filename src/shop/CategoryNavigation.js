import React, { Component} from 'react'
import {Link} from "react-router-dom"
import {ToggleLink} from "../ToggleLink"

export class CategoryNavigation extends Component {
    render() {
       // console.log("CategoryNavigation  " + this.props.categories)
        return <>
            <ToggleLink to={`${this.props.baseUrl}/all`} exact={false}>All</ToggleLink>
            { this.props.categories && this.props.categories.map( cat => 
                <Link className="btn btn-secondary btn-block" key={cat} 
                    to={`${this.props.baseUrl}/${cat.toLowerCase()}`}>{cat}</Link>    
            )}
        </>
    }
}