import { ProfileSidebar } from "./sidebar.jsx"
import { Popup } from "./popup.jsx"
import { useState } from "react"
function App() {
  const [name, setName] = useState("Brain")
  const [username, setUserName] = useState("user")
  function sendData(){
    const data = {Username:document.getElementById("u").value, Password:document.getElementById("p").value, Display:document.getElementById("d").value};
    setName(data.Display);
    setUserName(data.Username);
    (async () => {
      const rawResponse = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    })();
  }
  return (
    <>
    <div className = "flex w-fit static">
      <ProfileSidebar name = {name} username = {username}/>
      <div className = "flex flex-col h-screen">
        <h1 className = "lg:text-4xl sm:text-2xl">Posts</h1>
        <img src = "./src/ofo.jpg"></img>
      </div>
    </div>
    <Popup button = {<div><button className = "float-right bg-green-400 p-1 m-5 rounded-xl hover:tracking-widest hover:bg-green-600 transition-all ease">Submit</button><button className="float-right p-1 m-5 rounded-xl hover:tracking-widest transition-all ease text-green-900  hover:text-green-700 underline">Log In</button></div>} method = {sendData}>
        <h1 id = "hider" className = "text-4xl m-4">Create an Account</h1>
        <hr className = "text-green-950 w-full border-black border-2"></hr>
        <div className="flex flex-col m-4 gap-5 text-2xl">
          <h1>Username</h1>
          <input id = "u" type = "text" className="bg-green-100 focus:bg-green-300 transition-all ease rounded-xl"></input>
          <h1 >Password</h1>
          <input id = "p" type = "password" className="bg-green-100 focus:bg-green-300 transition-all ease rounded-xl"></input>
          <h1 >Display Name</h1>
          <input id = "d" type = "text" className="bg-green-100 focus:bg-green-300 transition-all ease rounded-xl"></input>
        </div>
    </Popup>
    </>
  )
}

export default App
