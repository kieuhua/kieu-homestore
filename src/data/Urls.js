import {DataTypes} from "./Types";
// requires diff URLs for production and development
const protocol = "http";
const hostname = "localhost";
const port = 3600;

// new data type allow new URLs
// I don't think I need RestUrls, because everything is graphql
/*
export const RestUrls = {
    [DataTypes.PRODUCTS] : `${protocol}://${hostname}:${port}/api/products`,
    [DataTypes.CATEGORIES] : `${protocol}://${hostname}:${port}/api/categories`,
    [DataTypes.ORDERS]: `${protocol}://${hostname}:${port}/api/orders`
}*/

export const GraphQlUrl = `${protocol}://${hostname}:${port}/graphql`;

export const authUrl = `${protocol}://${hostname}:${port}/login`;