import {graphql} from "react-apollo"
import * as compose from "lodash.flowright"
import { productsList, categoryList, productsTotal, categoryTotal} from "./clientQueries"
import {HomeConnector} from "./HomeConnector"

//let vars = {page: 1, pageSize: 10, sort: "id"}
let vars = {page: 1, pageSize: 10, sort: "id", category: "All"}

// graphql(queryname, config obj)
// k I guess categoryList give me this.props.categories in <ProductsTable> ??
//k props: {loading, products, refetch} 
// I think products is result from the graphql query of productsList
// so everything is result prefix products.
// that is why I have products.categorySize,
// but why it is undefined ??
export const ProductsConnector = compose(
//const PageComponent = compose(
    graphql(productsList, {
        options: (props) => ({ variables: vars}),
        props: ({data: { loading, products, refetch }}) => ({
            totalSize: loading ? 0 : products.totalSize,
            productsAllSize: loading ? 0 : products.productsAllSize,
            products: loading ? [] : products.products,
            currentPage: vars.page,
            pageCount: loading ? 0 : Math.ceil(products.totalSize / vars.pageSize),
            navigateToPage: (page) => { 
                vars.page = page; 
                console.log("ProductsConnector, navigateToPage, page: " + page)
                refetch(vars)
            },
            navigateToCategory: (category) => {
                console.log("ProductsConnector, category k: " + category)   // I got undefined
                vars.category = category
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
    })}),

    graphql( categoryTotal, {
        options: (props) => {
            // category = beb_bath
            console.log("ProductsConnector, categoryTotal, vars.category", vars.category)
            if (vars.category === undefined) { vars.category = "All"}
            return { variables: {category: vars.category }}
        } ,
        props: ({data: { loading, products }}) => ({
        categoryTotal: loading ? 0 : products.totalSize
        }) 
    })
) (HomeConnector)
