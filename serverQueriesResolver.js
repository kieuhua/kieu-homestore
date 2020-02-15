/* kieu
    let query = db.get ('products') => is array of all products 
    so drop() and take() seems to be database functions in json-server ??
    but I can't find any info about these two methods
    drop() and take() are not JS array functions
*/
//const paginateQuery = (query, page=1, pageSize=5) => {
const paginateQuery = (query, page=1, pageSize=5) => {
    console.log("serverQueriesResolver page, pageSize 4: " + page + ", pageSize: " +pageSize)    
    //serverQueriesResolver page, pageSize 3: 4, pageSize: 25
    //serverQueriesResolver page, pageSize 3: 5, pageSize: 25
    //serverQueriesResolver page, pageSize 3: 1, pageSize: 10

    //console.log("serverQueriesResolver query 5: " + JSON.stringify(query))    // all products
    //const page2 = page - 1
    //console.log("serverQueriesResolver page, pageSize 5: " + page + ", pageSize: " +pageSize)    
    const result = query.drop((page ) * pageSize).take(pageSize);
    console.log("serverQueriesResolver result 5: " + JSON.stringify(result))    
    return result
    //return query.drop((page2 -1) * pageSize).take(pageSize);
}

const product = ({id}, {db}) => db.get("products").getById(id).value()

/* 
    if category exist then test RegExp obj, otherwise reture product
    new RegExp(category, 'i').test(p.category)
    'furniture', if product is furniture category => t,
    filter(): if true => product,
*/
/* 
    let query = db.get ('products') => is array of all products 
*/
const products = ({category}, {db}) => ({
    totalSize: () => db.get('products')
        .filter(p => category ? new RegExp(category, 'i').test(p.category) : p )
        .size().value(),
    products: ({page, pageSize, sort}) => {
        let query = db.get("products");     // get all products =503
         // if category define, only query product is matched category
         if (category) {
             query = query.filter(item => new RegExp(category, "i").test(item.category))
         }
        if (sort) { 
            query = query.orderBy(sort)        
        }
        console.log("serverQueriesResolver page, pageSize 3: " + page + ", pageSize: " +pageSize)    
         return paginateQuery(query, page, pageSize).value()
    }

})

const categories = (args, {db}) => db.get('categories').value()

// resolveProductsand() => array of objects used in resolveOrders()
const resolveProducts = (products, db) => 
    products.map(p => ({
        quantity: p.quantity,
        product: product({ id: p.product.id} , {db})
    }))
// resolveOrders() used in orders
const resolveOrders = (onlyUnshipped, { page, pageSize, sort}, {db}) => {
    let query = db.get("orders")
    if (onlyUnshipped) {}
    if (sort) {}
    return paginateQuery(query, page, pageSize).value()
        .map( order => ({ ...order, product: () =>
            resolveProducts(order.products, db) }))
 }

 /*
    double conditions
    o => onlyUnshipped ? o.shipped === false => true => filter take the order
    if no onlyUnshipped then => order from filter()
 */
const orders = ({onlyUnshipped = false}, {db}) => ({
    totalSize: () => db.get("orders")
        .filter(o => onlyUnshipped ? o.shipped === false : o ).size().value(),
        orders: (...args) => resolveOrders(onlyUnshipped, ...args)
})

//const product = ({id}, {db}) => db.get("products").getById(id).value()
const order = ({id}, {db}) => db.get("orders").getById(id).value()

module.exports = { product, products, categories, orders, order}