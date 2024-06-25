var HandleAccount = require('./account.js')
var express = require('express'),
fs = require('fs')
var app = express();
app.use(express.json());
app.post("/account", (req,res) =>{
    const body = req.body
    res.header(`Access-Control-Allow-Origin`, `*`);
    HandleAccount(body,req,res)

})
app.listen(1234);