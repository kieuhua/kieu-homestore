import React, { Component} from 'react'
import { Link } from "react-router-dom"
import {ToggleLink} from "../ToggleLink"

export class CategoryNavigation extends Component {
    render() {
       // console.log("CategoryNavigation  " + this.props.categories)
        return <>
            <ToggleLink to={`/shop/products`} exact={true}>All</ToggleLink>
            { this.props.categories && this.props.categories.map( cat => 
                <ToggleLink key={cat} 
                    to={`${this.props.baseUrl}/${cat.toLowerCase()}`}>{cat}</ToggleLink>    
            )}
            <Link to="/admin" className="btn btn-block btn-secondary fixed-bottom m-2 col-3">Administration</Link>
        </>
    }
}