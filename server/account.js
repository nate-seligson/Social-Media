fs = require('fs')
function HandleAccount(body,req,res){
    let filePath = "data/data.csv"
    let dict = {}
    fs.readFile(filePath, 'utf8', function (err, data) {
        data.split("\n").forEach(function(acc){
            const pair = acc.split(",")
            dict[pair[0]] = [pair[1], pair[2], pair[3]]
        })
        if(body.Type == "createNew"){
            if(dict[body.Username] != null){
                res.json({response:"uTaken"})
                res.end()
            }
            else{
                const uID = createUserId()
                res.json({response:true, uID: uID})
                fs.appendFile(filePath,createNewAccount(body, uID), function(){})
                res.end()
            }
        }
        else if(body.Type == "login"){
            if(dict[body.Username] == null || dict[body.Username][0] != body.Password){
                res.json({response:"inc"})
                res.end()
            }
            else{
                res.json({response:true, userData:dict[body.Username]})
            }
        }
    });
}
function createUserId(){
    const chars = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM./?!@#$%^&*()~_"
    let res = ""
    for(let i = 0; i<24; i++){
        res+=chars[Math.floor(Math.random() * chars.length)]
    }
    return res
}
function createNewAccount(data, uID){
    const user = data.Username;
    const pass = data.Password;
    const dispName = data.Display;
    return `${user},${pass},${uID},${dispName}\n`
}
module.exports = HandleAccount;