fs = require('fs')
const filestoread = ["data/data.csv", "data/postdata.csv"]
let files={}
filestoread.forEach((file) => {
   files[file] = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' })
})
function createId(){
    const chars = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM./?!@#$%^&*()~_"
    let res = ""
    for(let i = 0; i<24; i++){
        res+=chars[Math.floor(Math.random() * chars.length)]
    }
    return res
}
class fileReader{
    constructor(filename){
        this.filePath = filename
        this.filedata = []
        files[this.filePath].split("\n").forEach((path) =>{
            let temp = []
            path.split(",").forEach((item) =>{
                temp.push(item)
            })
            this.filedata.push(temp)
        })
    }
    buildDict(index){
        let dict = {}
        this.filedata.forEach((user) =>{
            dict[user[index]] = []; 
            for(let i = 0; i<user.length; i++)
            {
                if(i == index){continue}; 
                dict[user[index]].push(user[i])
            }
         })
         return dict
        }
    reBuild(){
        let res = ""
        this.filedata.forEach((user) =>{
            let temp = ``
            user.forEach((line)=>{
                temp += `${line},`
            })
            res+=temp + `\n`
        })
        fs.writeFile(this.filePath, res, function(){})
    }
    Index(q){
        for(var i = 0; i<this.filedata.length; i++){
            if(this.filedata[i].includes(q)){return i}
        }
    }
    appendFile(txt){
        fs.appendFile(this.filePath,txt, function(){})
    }
}
module.exports = {fileReader, createId};