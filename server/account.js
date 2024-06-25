fs = require('fs')
let filePath = "data/data.csv"
let filedata = []
let userDict = {}
let idDict = {}
fs.readFile(filePath, 'utf8', function (err, data) {
    data.split("\n").forEach(function(acc){
        const pair = acc.split(",")
        filedata.push(pair)
    })
const buildDict = (dict, index, user) => {
    dict[user[index]] = []; 
    for(let i = 0; i<user.length; i++)
    {
        if(i == index){continue}; 
        dict[user[index]].push(user[i])
    }
}
filedata.forEach((user) =>{
   buildDict(userDict, 0, user)
   buildDict(idDict, 2, user)
})
});
function HandleAccount(body,req,res){
        if(body.Type == "createNew"){
            if(userDict[body.Username] != null){
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
            if(userDict[body.Username] == null || userDict[body.Username][0] != body.Password){
                res.json({response:"inc"})
                res.end()
            }
            else{
                res.json({response:true, userData:userDict[body.Username]})
            }
        }
        else if(body.Type == "pfp"){
            const index = userIndex(body.uID)
            filedata[index][4] = body.URL;
            reBuild();
            res.json({response:true})
        }
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
    return `${user},${pass},${uID},${dispName},null\n`
}
function reBuild(){
    res = ""
    filedata.forEach((user) =>{
        temp = ``
        user.forEach((line)=>{
            temp += `${line},`
        })
        res+=temp + `\n`
    })
    fs.writeFile(filePath, res, function(){})
}
function userIndex(q){
    for(var i = 0; i<filedata.length; i++){
        if(filedata[i].includes(q)){return i}
    }
}
module.exports = HandleAccount;