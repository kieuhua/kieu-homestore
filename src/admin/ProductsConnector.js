import {graphql} from "react-apollo"
import * as compose from "lodash.flowright"
import { ProductsTable} from "./ProductsTable"
import {productsList} from "./clientQueries"
import {deleteProduct} from "./clientMutations"


const vars = { page: 1, pageSize: 10, sort: "id"}

// graphql(queryname, config obj)
// update: in deleteProduct query, delete product with id from cache
// it filter that product with that id from products list and 
// subtract 1 from products.totalSize
// then write the update products list to cache

// need to read this more about graphhq method, https://www.apollographql.com/docs/react/api/react-apollo/
export const ConnectedProducts = compose(
    graphql(productsList, {
        options: (props) => ({variables: vars}),
        props: ({ data: {loading, products, refetch}}) => ({
            totalSize: loading ? 0 : products.totalSize,
            productsAllSize: loading ? 0 : products.productsAllSize,
            products: loading ? [] : products.products,
            currentPage: vars.page,
            pageCount: loading ? 0 : Math.ceil(products.totalSize / vars.pageSize),
            navigateToPage: (page) => { vars.page = Number(page); refetch(vars)},
            pageSize: vars.pageSize,
            setPageSize: (size) => {vars.pageSize = Number(size); refetch(vars)},
            sortKey: vars.sort,
            setSortProperty: (key) => { vars.sort = key; refetch(vars)},
        })
    }),
    graphql(deleteProduct, {
        options: {
            update : (cache, {data: {deleteProduct: {id}}}) => {
                const queryDetails = {query: productsList, variables: vars}
                const data = cache.readQuery(queryDetails);
                data.products.products = data.products.products.fileter( p => p.id !== id)
                data.products.totalSize = data.products.totalSize - 1
                cache.writeQuery({...queryDetails, data})
            }
        },
        props: ({mutate}) => ({
            deleteProduct: (id) => {
                console.log("ProductsConnector, deleteProduct, id: " + id)
                const result = mutate({variables: {id}})

                return result
            }
        })
    })
) (ProductsTable)