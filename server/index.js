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
        if(dict[body.Username] == body.Password){
            console.log("welcome back")
        }
        else if(dict[body.Username] != body.Password && dict[body.Username] != null){
            console.log(dict[body.Username])
        }
        else{
            fs.appendFile(filePath,createNewAccount(body), function(){})
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