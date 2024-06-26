const {HandleAccount}= require('./account.js')
const {HandlePost} = require('./post.js')
var express = require('express'),
fs = require('fs')
var app = express();
app.use(express.json({limit: '50mb'}));
app.post("/account", (req,res) =>{
    const body = req.body
    res.header(`Access-Control-Allow-Origin`, `*`);
    HandleAccount(body,res)

})
app.post("/post", (req,res) =>{
    const body = req.body
    res.header(`Access-Control-Allow-Origin`, `*`);
    HandlePost(body,res)

})
app.listen(1234);