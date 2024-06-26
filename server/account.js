const {fileReader, createId} = require('./filehandler.js')
const fr = new fileReader("data/data.csv")
let userDict = fr.buildDict(0)
let uIDDict = fr.buildDict(2)
function HandleAccount(body,res){
        if(body.Type == "createNew"){
            if(userDict[body.Username] != null){
                res.json({response:"uTaken"})
                res.end()
            }
            else{
                const uID = createId()
                res.json({response:true, uID: uID})
                fr.appendFile(createNewAccount(body, uID))
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
            const index = fr.Index(body.uID)
            fr.filedata[index][4] = body.URL;
            fr.reBuild();
            userDict = fr.buildDict(0)
            uIDDict = fr.buildDict(2)
            res.json({response:true})
        }
        else if(body.Type == "lookup"){
            const items = uIDDict[body.uID]
            res.json({response:true, username:items[0], displayname:items[2], pfpURL:items[3]})
        }
}
function createNewAccount(data, uID){
    const user = data.Username;
    const pass = data.Password;
    const dispName = data.Display;
    return `${user},${pass},${uID},${dispName},nothing\n`
}
module.exports = {HandleAccount, createId};