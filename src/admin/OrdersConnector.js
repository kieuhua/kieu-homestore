import {graphql} from "react-apollo"
import { ordersSummaryQuery} from "./clientQueries"
import { OrdersTable } from  "./OrdersTable"

/* k compose is no longer in "react-apollo"
    it moved to lodash.flowright, and 
    import * as compose from "lodash.flowright"
*/
import * as compose from "lodash.flowright"
import {shipOrder} from "./clientMutations"

// the set of variables that will be applied to the GQL query
const vars = { onlyShipped: false, page: 1, pageSize: 10, sort: "id"}

//graphql(queryname, configure obj)
// in configure obj, props property receives a function mutate
export const OrdersConnector = compose( 
    graphql(ordersSummaryQuery, {
        // using a function that receives the props applied by the parent 
        options: (props) => ({ variables: vars }),
//
        // refetch to refresh the query
        props: ({ data: {loading, orders, refetch}}, errors) => {

            if (errors) {
                // 04/24/20, I got this
                console.log("OrdersConnector: errors: " + JSON.stringify(errors))   // no errors
            }
            
            if (orders) {
               console.log("OrdersConnector; props: " + JSON.stringify(orders))
            }
            //console.log("OrdersConnector; props: " + JSON.stringify(orders))

            const result = {
            totalSize: loading ? 0 : orders.totalSize,
            orders: loading ? [] : orders.orders,
            currentPage: vars.page,
            pageCount: loading ? 0 : Math.ceil(orders.totalSize / vars.pageSize),
            navigateToPage: (page) => {
                vars.page = Number(page);
                refetch(vars);
                console.log("OrdersConnector: vars.page: " + vars.page)
            },
            pageSize: vars.pageSize,
            setPageSize: (size) => { vars.pageSize = Number(size); refetch(vars)},
            setSortProperty: (key) => {vars.sort = key; refetch(vars)},
            }
            console.log("OrdersConnector: totalSize: " + result.totalSize)
            return result
        }  
    }),
    graphql(shipOrder, {
        props: ({ mutate}) => ({
            toggleShipped: (id, shipped) => mutate({ variables: {id, shipped }})
        })
    })
) (OrdersTable)