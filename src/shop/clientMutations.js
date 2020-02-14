import gql from "graphql-tag"

export const storeOrder = gql`
    mutation($order: orderStore) {
        storeOrder(order: $order) {id, name, email, address, city, zip, country, shipped  }
    }
`