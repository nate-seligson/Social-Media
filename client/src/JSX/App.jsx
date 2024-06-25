import { ProfileSidebar } from "./sidebar.jsx"
import {Popup } from "./popup.jsx"
import { useState } from "react"
import { UserDataHandler } from "../JS/DataHandler.js"
function App() {
    const [user, setUser] = useState(new UserDataHandler("","",""))
    const [errorMsg, setErr] = useState("");
    const [popup, setPopup] = useState("create_account")
    async function CreateAccount(){
        const userData = new UserDataHandler(document.getElementById("u").value, document.getElementById("p").value,document.getElementById("d").value)
        const response = await userData.SendNewAccount();
        console.log(response)
        if(response == true){
          setPopup("");
          setUser(userData);
        }
        else if(response == "uTaken"){
         setErr("Error: Username taken. Please try a different username.")
        }
        else{
          setErr("Error: Could not connect to server.")
        }
    }
    async function Login(){
        const userData = new UserDataHandler(document.getElementById("lu").value, document.getElementById("lp").value)
        const response = await userData.AttemptLogin()
        if(response == true){
          setPopup("");
          setUser(userData);
        }
        else if(response == "inc"){
          setErr("Error: Incorrect Username or Password. Please try again.")
         }
         else{
          setErr("Error: Could not connect to server.")
        }
    }
    async function setPFP(event){
      if (event.target.files && event.target.files[0]) {
        await user.setPfp(event.target.files[0]);
        return user.pfpURL
      }
    }

  return (
    <>
    <div className = "flex w-fit static">
      <ProfileSidebar name = {user.displayname} username = {user.username} pfp = {user.pfpURL} pfpMethod = {setPFP}/>
      <div className = "flex flex-col h-screen">
        <h1 className = "lg:text-4xl sm:text-2xl">Posts</h1>
        <img src = "./src/ofo.jpg"></img>
      </div>
    </div>
    <Popup hidden = {popup == "create_account"} error = {errorMsg}>
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
       <button onClick = {CreateAccount}className = "float-right bg-green-400 p-1 m-5 rounded-xl hover:tracking-widest hover:bg-green-600 transition-all ease">Submit</button>
       <button onClick = {() => {setPopup("login")}}className="float-right p-1 m-5 rounded-xl hover:tracking-widest transition-all ease text-green-900  hover:text-green-700 underline">Log In</button>
    </Popup>
    <Popup hidden = {popup == "login"} error = {errorMsg}>
    <h1 id = "hider" className = "text-4xl m-4">Log In</h1>
        <hr className = "text-green-950 w-full border-black border-2"></hr>
        <div className="flex flex-col m-4 gap-5 text-2xl">
          <h1>Username</h1>
          <input id = "lu" type = "text" className="bg-green-100 focus:bg-green-300 transition-all ease rounded-xl"></input>
          <h1 >Password</h1>
          <input id = "lp" type = "password" className="bg-green-100 focus:bg-green-300 transition-all ease rounded-xl"></input>
        </div>
       <button onClick = {Login}className = "float-right bg-green-400 p-1 m-5 rounded-xl hover:tracking-widest hover:bg-green-600 transition-all ease">Submit</button>
    </Popup>
    <h1>{errorMsg}</h1>
    </>
  )
}

export default App
