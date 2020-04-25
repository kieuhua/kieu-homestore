// this uses in products, not sure ??, return the right page ??
//const paginateQuery = (query, page=1, pageSize=5) => query.drop((page-1) * pageSize).take(pageSize);

// product(id: ID!): return product 
//const product = ({id}, {db}) => db.get('products').getById(id).value();

const paginateQuery = (query, page = 1, pageSize = 5) => 
    query.drop((page - 1) * pageSize).take(pageSize);

//const product = ({id}, {db}) => db.get("products").getById(id).value();
const product = ({id}, {db}) => {
	//console.log(" I am in product method") this work, it runs many times
   const result = db.get("products").getById(id).value()
    //console.log("serverQueriesResolver 1:" + JSON.stringify(result))
	//console.log("resolveOrders in product method " + JSON.stringify(result))
	
    return result
	//return db.get("products").getById(id).value()
}



/* products(category: String, sort: String, page: Int, pageSize: Int): 
    return productPage
    filter() => p if category match p.category (true/false)
            if category not define then return p(true)
*/
const products = ({category}, {db}) => ({
    totalSize: () => db.get('products')
        .filter(p => category ? new RegExp(category, 'i').test(p.category) : p)
        .size().value(),
    products:({page, pageSize, sort}) => {
        let query = db.get("products");
        // if category define, only query product is matched category
        if (category) {
            query = query.filter(item => new RegExp(category, "i").test(item.category))
        }
        if (sort) { query = query.orderBy(sort)}
        return paginateQuery(query, page, pageSize).value();
    }
})
/* k I don't use this
const productsCategory= ({category}, {db}) => ({
    
    totalSize: () => {
        //console.log("category 2 : " + JSON.stringify(category)) // undefined

        const result = db.get('products') 
       // console.log("server result: " + result.size())

        const result2 = result.filter(p => category ? new RegExp(category, 'i').test(p.category) : p ) 
       // console.log("server result2: " + result2.size())
        const result3 = result2.size().value()
       // console.log("server totalSize: " + result3)
        return result3
        },
    products: ({ page, pageSize, sort}) => {
            let query = db.get("products");     // get all products =503
             // if category define, only query product is matched category
             if (category) {
                 query = query.filter(item => new RegExp(category, "i").test(item.category))
                // console.log("server query: " + JSON.stringify(query))
                //console.log("category: " + category)
             }
            if (sort) { 
                query = query.orderBy(sort)        
            }
            //console.log("serverQueriesResolver:productsCategory: " + page + ", pageSize: " +pageSize)    
            //console.log("server query: " + JSON.stringify(query))
    
             return paginateQuery(query, page, pageSize).value()
        }
}) */

// categories: [String]
const categories = (args, {db}) => db.get('categories').value()

// these use in orders
// resolveProducts => an array of quantity of particular product(id) to use in order
/*
const resolveProducts = (products, db) => 
    products.map(p => ({
        quantity: p.quantity, product: product({ id: p.product_id}, {db})
    }))
const resolveOrders = (onlyUnshipped, { page, pageSize, sort}, {db}) => {
    let query = db.get("orders");
    if (onlyUnshipped) { query = query.filter({ shipped: false}) }
    if (sort) { query = query.orderBy(sort) }
    return paginateQuery(query, page, pageSize).value()
        .map(order => ({ ...order, products: () =>
            resolveProducts(order.products, db) }))
}
// orders(onlyUnshipped: Boolean): return orderPage
const orders = ({onlyUnshipped = false}, {db}) => ({
    totalSize: () => db.get("orders")
        .filter(o => onlyUnshipped ? o.shipped === false : o).size().value(),
    orders: (...args) => resolveOrders(onlyUnshipped, ...args)
})
*/
const resolveProducts = (products, db) => 
    products.map(p => ({ 
        quantity: p.quantity, 
        product: product({ id: p.product_id} , {db})
    }))

const resolveOrders = (onlyUnshipped, { page, pageSize, sort}, { db }) => {    
    let query = db.get("orders");
    if (onlyUnshipped) { query = query.filter({ shipped: false}) }
    if (sort) { query = query.orderBy(sort) }    
    console.log("serverQueriesResolver 2: page: " + page + ", pageSize: " + pageSize + ", sort: " + sort )    
	//
    return paginateQuery(query, page, pageSize).value()
        .map(order => ({ ...order, products: () => 
            resolveProducts(order.products, db) }));
	//
	/*
	// I can't do this, because most methods calls are async
  const result = paginateQuery(query, page, pageSize).value()
    //console.log("resolveOrders: " + JSON.stringify(result))
    //
   return result.map( order => ({ ...order, product: () =>
     resolveProducts(order.products, db) }))
	   
     //
    const result2 = result.map( order => ({ ...order, product: () =>
     resolveProducts(order.products, db) }))
    console.log("resolveOrders 2 after resolveProducts: " + JSON.stringify(result2))
    console.log("I am in the end of resolveOrders")
     return result2
	*/
}

const orders = ({onlyUnshipped = false}, {db}) => ({ 
    totalSize: () => db.get("orders")
        .filter(o => onlyUnshipped ? o.shipped === false : o).size().value(),
    orders: (...args) => resolveOrders(onlyUnshipped, ...args)
})

const order = ({id}, {db}) => {
	console.log("resolver: kieu start" )
	const result = db.get("orders").getById(id).value()
	console.log("resolver: kieu " + JSON.stringify(result))
	return result
}

module.exports = { product, products, categories, orders, order}