const jwt = require("jsonwebtoken")

const APP_SECRET = "myappsecret", USERNAME = "admin", PASSWORD = "secret";
/*
adding "/shops/products" don't work, because the request is begin with "/graphql"
*/
const anonOps = [ {method: "GET", urls: ["/api/products", "/api/categories"]},
        {method: "POST", urls:["/api/orders"]}]

module.exports = function (req, res, next) {
    // if it is public access, no need for authenication, then go next middleware
    // compare req.method with capital like "GET" ???
    
    if (anonOps.find(op => op.method === req.method 
            && op.urls.find(url => req.url.startsWith(url)))) {
        //console.log("request 1: " + req.url )     // request: /graphql
        next()
    } else if (req.url === '/login' && req.method === 'POST') {
        //console.log("request /login 2: " + req.url )     // request: /graphql

        // compare username and password
        if (req.body.username === USERNAME && req.body.password === PASSWORD) {
            // response with a jwt token good for one hour

            res.json({
                success: true,
                token: jwt.sign({data: USERNAME, expires: "1h"}, APP_SECRET)
            })

        }
    //} else if (req.url === '/graphql' && req.body["query"].match(/products|categories/)) {
    } else if (req.url === '/graphql' || req.url === "/graphql?" ) {
        //k I assume all graphql requests are safe and are authorized 
        // this is not good but I don't know enough graph yet to make it right
        
       // console.log("request body 1:" + JSON.stringify(req.body) + ":end")
        let queryStr = req.body["query"]
        //console.log("authMiddleware: query string: " + queryStr)
        next();
    } 
    else {
        //console.log("request 4: " + req.url )     // request: /graphql
        /* check to see if there is json web token? */
       // console.log("request body 2:" + JSON.stringify(req.body) + ":end")
        let token = req.headers["authorization"];
        if (token != null && token.startsWith("Bearer<")) {
            token = token.substring(7, token.length-1)
            jwt.verify(token, APP_SECRET); // verify token against token name
            next();
        } else {
            res.statusCode = 401;
            res.end();
        } 
    }
}