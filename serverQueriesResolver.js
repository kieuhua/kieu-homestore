/*
    let query = db.get ('products') => is array of all products 
    so drop() and take() seems to be database functions in json-server ??
    but I can't find any info about these two methods
    drop() and take() are not JS array functions
*/
const paginateQuery = (query, page=1, pageSize=5) => 
    query.drop((page-1) * pageSize).take(pageSize);

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
        let query = db.get("products");
         // if category define, only query product is matched category
         if (category) {
             query = query.filter(item => new RegExp(category, "i").test(item.category))
         }
         if (sort) { query.orderBy(sort)}
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