import React, {Component} from "react";
import {OrdersRow} from "./OrdersRow"
import {PaginationControls} from "../PaginationControls";

export class OrdersTable extends Component {
    render() {
         console.log("OrdersTable totalSize: " + this.props.totalSize)     // 103
         console.log("OrdersTable currentPage: " + this.props.currentPage) 
        console.log("OrdersTable: orders_size: " + this.props.size)
        //console.log("OrdersTable: orders: " + JSON.stringify(this.props.orders) )

		    
        return <div>
            <h4 className="bg-info text-white text-center p-2"> 
                {this.props.totalSize} Orders
            </h4>
            <PaginationControls keys={["ID", "Name"]}  { ...this.props } />
            <table className="table table-sm table-stripped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className="text-right">Total</th>
                        <th className="text-center">Shipped</th>
                    </tr>
                </thead>
                <tbody>
                    {   /* this check for null and undefined */
                        this.props.orders !== null && this.props.orders.map(order => 
                        <OrdersRow key={ order.id } 
                            order={ order} toggleShipped={ () => 
                                this.props.toggleShipped(order.id, !order.shipped) }  
                        /> )
                    }
                </tbody>
            </table>
        </div>
     }
}