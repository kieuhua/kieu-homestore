import gql from "graphql-tag";

export const categoryList = gql`
    query {categories} `

    // query (..) declare variables and its types
export const productsList = gql`
    query(  $page: Int, $pageSize: Int, $sort: String, $category: String) {
        products(category: $category) {
            totalSize, 
            products(page: $page, pageSize: $pageSize, sort: $sort) {
                id, name, category, price, description
            }
        }
    }`

export const productsList2 = gql`
    query(  $page: Int, $pageSize: Int, $sort: String) {
        products  {
            totalSize, 
            products(page: $page, pageSize: $pageSize, sort: $sort) {
                id, name, category, price, description
            }
        }
    }`

export const product = gql`
    query($id: ID!) {
        product(id: $id) {
            id, name, description, category, price
        }
    }`

export const productsTotal = gql` query {products {totalSize} }`
