var express = require('express'),
fs = require('fs')
var app = express();
app.use(express.json());
app.post("/test", (req,res) =>{
    res.header(`Access-Control-Allow-Origin`, `*`);
    const body = req.body
    let filePath = "data/data.csv"
    let dict = {}
    fs.readFile(filePath, 'utf8', function (err, data) {
        data.split("\n").forEach(function(acc){
            const pair = acc.split(",")
            dict[pair[1]] = pair[2]
        })
        if(dict[body.Username] != null){
            res.json({response:"uTaken"})
            res.end()
        }
        else{
            res.json({response:true})
            fs.appendFile(filePath,createNewAccount(body), function(){})
            res.end()
        }
    });
})
function createUserId(){
    const chars = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM,./;:?><!@#$%^&*()`~-_=+"
    let res = ""
    for(let i = 0; i<24; i++){
        res+=chars[Math.floor(Math.random() * chars.length)]
    }
    return res
}
function createNewAccount(data){
    const user = data.Username;
    const pass = data.Password;
    const dispName = data.Display;
    const userID = createUserId();
    return `${userID},${user},${pass},${dispName}\n`
}
app.listen(1234);