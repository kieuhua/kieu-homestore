const storeProduct = ({product}, {db}) =>
    db.get("products").insert(product).value()

const updateProduct = ({product}, {db}) => 
    db.get("products").updateById(product.id, product).value()

const deleteProduct = ({id}, {db}) => db.get("products").removeById(id).value();

const shipOrder = ({id, shipped}, {db}) => 
    db.get('orders').updateById(id, {shipped: shipped}).value()

// storeOrder(order: orderStore) : return order
//k orderStore is in serverMutationsShema.graphql
const storeOrder = ({order}, {db}) =>
	db.get("orders").insert(order).value()

module.exports = { storeProduct, updateProduct, deleteProduct, shipOrder, storeOrder}