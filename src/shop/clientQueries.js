import gql from "graphql-tag";

export const categoryList = gql`
    query {categories} `
    
export const productsList = gql`
    query( $page: Int, $pageSize: Int, $sort: String) {
        products  {
            totalSize, 
            products(page: $page, pageSize: $pageSize, sort: $sort) {
                id, name, category, price, description
            }
        }
    }`
export const productsCategory = gql`
    query  products($category: String!) {
        products  {
            products(category: $category, page: $page, pageSize: $pageSize, sort: $sort) {
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
