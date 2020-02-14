import React, {Component} from "react"
export class ValidationError extends Component {
    render() {
        // if errors obj is not null display each error message
        if (this.props.errors) {
            return this.props.errors.map(err => 
                <h6 className="text-danger" key={err}>{err}</h6>
            )
        }
        return null;
    }
}