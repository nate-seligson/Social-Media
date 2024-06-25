export class UserDataHandler{
    constructor(username, password, displayname = ""){
        this.username = username;
        this.password = password;
        this.displayname = displayname;
        this.uID = ""
        this.pfpURL = ""
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
            if(server_response.userData[3] != null) {await this.decodePFP(server_response.userData[3])}
        }
        return server_response.response;
    }
    async setPfp(file){
        const encoded = await this.encodePFP(file);
        this.pfpURL = URL.createObjectURL(file);
        const data = {Type:"pfp", uID: this.uID, URL: encoded};
        const server_response = await this.sendData(data);
        return server_response.response;
    }
    async encodePFP(file){
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
    async decodePFP(encoded){
        const byteCharacters = atob(encoded);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type:"image/svg+xml"});
        this.pfpURL = URL.createObjectURL(blob);
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