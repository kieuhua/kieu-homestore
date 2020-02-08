import gql from "graphql-tag";
    
export const productsList = gql`
    query($page: Int, $pageSize: Int, $sort: String) {
        products {
            totalSize, 
            products(page: $page, pageSize: $pageSize, sort: $sort) {
                id, name, category, price
            }
        }
    }`

export const product = gql`
    query($id: ID!) {
        product(id: $id) {
            id, name, description, category, price
        }
    }`

