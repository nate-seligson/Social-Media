export class UserDataHandler{
    constructor(username, password, displayname = ""){
        this.username = username;
        this.password = password;
        this.displayname = displayname;
        this.uID = ""
        this.pfpURL = "nothing"
    }
    async SendNewAccount(){
        const data = {Type:"createNew", Username:this.username, Password:this.password, Display:this.displayname};
        const server_response = await this.sendData(data)
        if(server_response.response == true){
            this.uID = server_response.uID
        }
        return server_response.response
    }
    async AttemptLogin(){
        const data = {Type:"login", Username:this.username, Password:this.password};
        const server_response = await this.sendData(data)
        if(server_response.response == true){
            this.displayname = server_response.userData[2]
            this.uID = server_response.userData[1]
            if(server_response.userData[3] != null) {this.pfpURL = await decodePhoto(server_response.userData[3])}
        }
        return server_response.response;
    }
    async setPfp(file){
        const encoded = await encodePhoto(file);
        this.pfpURL = URL.createObjectURL(file);
        const data = {Type:"pfp", uID: this.uID, URL: encoded};
        const server_response = await this.sendData(data);
        return server_response.response;
    }
    sendData(data){
        return (async () => {
            const rawResponse = await fetch('/api/account', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            const content = await rawResponse.json();
            return content;
          })();
    }
}
export class PublicUser{
    constructor(){
        this.username = "";
        this.displayname = "";
        this.pfpURL = ""
    }
    async create(uID){
        const data = await this.sendData({Type:"lookup", uID:uID})
        this.username = data.username;
        this.displayname = data.displayname;
        this.pfpURL = await decodePhoto(data.pfpURL);
        return
    }
    //BAD create parent class
    sendData(data){
        return (async () => {
            const rawResponse = await fetch('/api/account', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            const content = await rawResponse.json();
            return content;
          })();
    }
}
export class PostHandler{
    constructor(content = "", uid = ""){
        this.content = content
        this.uID = uid;
    }
    async Upload(){
        const data = {Type:"upload", uID:this.uID, Content:this.content}
        const server_response = await this.sendData(data)
        return server_response
    }
    sendData(data){
        return (async () => {
            const rawResponse = await fetch('/api/post', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            const content = await rawResponse.json();
            return content;
          })();
    }
}
export class FeedHandler extends PostHandler{
    constructor(){
        super();
        this.feed = 0;
        this.postData = []
    }
    async GetFeed(){
        const data = {Type:"feed", index:this.feed}
        const server_response = await this.sendData(data)
        return server_response.feed
    }
    async GetPostData(){
        const rawData = await this.GetFeed();
        for(let i = 1; i<rawData.length; i++){
            const data = rawData[i]
            const profile = new PublicUser()
            await profile.create(data[0])
            this.postData[i] = {profile:profile, content:data[2]}
        }
    }
    
}
async function encodePhoto(file){
    let reader = new FileReader();
    let base64String = "";
    return new Promise((resolve) =>{
    reader.onloadend = function(){
      base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");
        resolve(base64String)
    }
    reader.readAsDataURL(file);
})

}
async function decodePhoto(encoded){
    const byteCharacters = atob(encoded);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type:"image/*"});
    return URL.createObjectURL(blob);
}