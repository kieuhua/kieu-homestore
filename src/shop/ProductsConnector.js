import {graphql} from "react-apollo"
import * as compose from "lodash.flowright"
import { productsList, categoryList, productsTotal} from "./clientQueries"
import {HomeConnector} from "./HomeConnector"

//let vars = {page: 1, pageSize: 10, sort: "id"}
let vars = {page: 1, pageSize: 10, sort: "id", catogory: "All"}

// graphql(queryname, config obj)
export const ProductsConnector = compose(
//const PageComponent = compose(
    graphql(productsList, {
        options: (props) => ({ variables: vars}),
        props: ({data: { loading, products, refetch }}) => ({
            totalSize: loading ? 0 : products.totalSize,
            products: loading ? [] : products.products,
            currentPage: vars.page,
            pageCount: loading ? 0 : Math.ceil(products.totalSize / vars.pageSize),
            navigateToPage: (page) => { 
                vars.page = page; 
                console.log("ProductsConnector, navigateToPage, page: " + page)
                refetch(vars)
            },
            pageSize: vars.pageSize,
            setPageSize: (size) => { vars.pageSize = Number(size); refetch(vars)},
            sortKey: vars.sort,
            setSortProperty: (key) => {vars.sort =key; refetch(vars)},
            category: vars.category
        })
    }),
 
    graphql( categoryList, {props: ({data: {categories }}) => ( {categories: categories} ) }),
   
    graphql( productsTotal, {props: ({data: { loading, products }}) => ({
        productsTotal: loading ? 0 : products.totalSize
    })})
) (HomeConnector)
