import {DataTypes} from "./Types";
// requires diff URLs for production and development
const protocol = "http";
const hostname = "localhost";
const port = 3500;

// new data type allow new URLs
export const RestUrls = {
    [DataTypes.PRODUCTS] : `${protocol}://${hostname}:${port}/api/products`,
    [DataTypes.CATEGORIES] : `${protocol}://${hostname}:${port}/api/categories`,
    [DataTypes.ORDERS]: `${protocol}://${hostname}:${port}/api/orders`
}

export const GraphQlUrl = `${protocol}://${hostname}:${port}/graphql`;