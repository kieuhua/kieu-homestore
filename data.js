/*k the web service use this file data.js to generate products and categories
and order 
*/
var faker = require("faker");
//var data = [];
//var categories = ["Watersports", "Soccer", "Chess", "Running"];
//var categories = ["Furniture", "Home_Deco", "Bed_Bath", "Kitchen_Gadgets", "Cookware", "Cutlery", "Outdoor_Living", "Garden"];
var categories = ["Furniture", "Bed_Bath", "Kitchen",  "Garden"];
var products = [];
faker.seed(100);
for (let i = 1; i <= 503; i++){
    var category = faker.helpers.randomize(categories);
   // data.push({
    products.push({
        id: i,
        name: faker.commerce.productName(),
        category: category,
        description: `${category}: ${faker.lorem.sentence(3)}`,
        price: Number(faker.commerce.price())
    })
}

var orders = [];

for (let i = 1; i <= 103; i++) {
    var fname = faker.name.firstName(); var sname = faker.name.lastName();
    var order = {
        id: i, name: `${fname} ${sname}`,
        email: faker.internet.email(fname, sname),
        address: faker.address.streetAddress(), city: faker.address.city(),
        zip: faker.address.zipCode(), country: faker.address.country(),
        shipped: faker.random.boolean(), products:[]
    }
    var productCount = faker.random.number({min: 1, max: 5});
    var product_ids = [];
    
    //k this create 503 product_id 
    while ( product_ids.length < productCount  ) {
        var candidateId = faker.random.number({ min: 1, max: products.length});
        // if id is not in product_ids array yet, add to it
        if (product_ids.indexOf(candidateId) === -1) {
            product_ids.push(candidateId);
        }
    }

    for (let j = 0; j < productCount; j++) {
        order.products.push({
            quantity: faker.random.number({min: 1, max: 10}),
            product_id: product_ids[j]
        })
        //console.log("data create; product_id: " + JSON.stringify(order.products[2] ))
        //data create; product_id: {"quantity":5,"product_id":12}

    } 
   orders.push(order);
} 

module.exports = () => ({ categories, products, orders})

