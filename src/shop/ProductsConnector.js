import {graphql} from "react-apollo"
import * as compose from "lodash.flowright"
import { productsList} from "./clientQueries"
import {ShopConnector} from "./ShopConnector"

const vars = {page:1, pageSize: 10, sort: "id"}

// graphql(queryname, config obj)
export const ProductsConnector = compose(
    graphql( productsList, {
        options: (props) => ({ varialbes: vars}),
        props: ({data: {loading, products, refetch }}) => ({
            totalSize: loading ? 0 : products.totalSize,
            products: loading ? [] : products.products,
            currentPage: vars.page,
            pageCount: loading ? 0: Math.ceil(products.totalSize / vars.page),
            navigateToPage: (page) => {vars.page = Number(page); refetch(vars)},
            pageSize: vars.pageSize,
            setPageSize: (size) => { vars.pageSize = Number(size); refetch(vars)},
            sortKey: vars.sort,
            setSortProperty: (key) => {vars.sort = key; refetch(vars)}
        })
    }),
) (ShopConnector)