export class UserDataHandler{
    constructor(username, password, displayname = ""){
        this.username = username;
        this.password = password;
        this.displayname = displayname;
        this.uID = ""
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
        console.log(server_response)
        if(server_response.response == true){
            this.displayname = server_response.userData[2]
            this.uID = server_response.userData[1]
        }
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