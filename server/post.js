const {fileReader, createId} = require("./filehandler.js");
const fr = new fileReader("data/postdata.csv")
function HandlePost(body, res){
    if(body.Type == "upload"){
        fr.appendFile(buildPost(body))
        res.json({response:true})
    }
    else if(body.Type == "feed"){
        res.json({response:true, feed:[...fr.filedata].reverse().splice(body.feed)})
        res.end()
    }
}
function buildPost(body){
    return `${body.uID},${createId()},${body.Content}\n`
}
module.exports={HandlePost}