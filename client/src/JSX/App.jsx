import { ProfileSidebar } from "./sidebar.jsx"
import { Scrollify } from "../JS/scrollbar.js"
import {Popup } from "./popup.jsx"
import { useState, useEffect } from "react"
import { UserDataHandler, PostHandler, FeedHandler } from "../JS/DataHandler.js"
import { Plus } from "./svg.jsx"
import { Feed } from "./post.jsx"
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
    async function MakePost(){
      setPopup("")
      const content = document.getElementById("pc").value;
      const postData = new PostHandler(content, user.uID)
      const response = await postData.Upload()
    }
    useEffect(() => {Scrollify(document.getElementById("scroll"))}, [])
  return (
    <>
    <div className = "flex static w-screen">
      <ProfileSidebar name = {user.displayname} username = {user.username} pfp = {user.pfpURL} pfpMethod = {setPFP}/>
      <div className = "flex flex-col overflow-hidden w-max h-screen">
        <Feed feedHandler = {new FeedHandler()}>
        <div onClick = {() => {setPopup("post")}}>
        <Plus className="w-10 hover:fill-green-950 hover:animate-pulse transition-all ease"/>
        </div>
        </Feed>
      </div>
    </div>



    <Popup hidden = {popup == "create_account"} error = {errorMsg}>
        <h1 id = "hider" className = "text-4xl m-4">Create an Account</h1>
        <hr className = "text-green-950 w-full border-black border-2"></hr>
        <div className="flex flex-col m-4 gap-5 text-2xl">
          <h1>Username</h1>
          <input id = "u" type = "text" className="bg-green-100 focus:bg-green-300 transition-all ease rounded-xl border-green-900 focus:border-8"></input>
          <h1 >Password</h1>
          <input id = "p" type = "password" className="bg-green-100 focus:bg-green-300 transition-all ease rounded-xl border-green-900 focus:border-8"></input>
          <h1 >Display Name</h1>
          <input id = "d" type = "text" className="bg-green-100 focus:bg-green-300 transition-all ease rounded-xl border-green-900 focus:border-8"></input>
        </div>
       <button onClick = {CreateAccount}className = "float-right bg-green-400 p-1 m-5 rounded-xl hover:tracking-widest hover:bg-green-600 transition-all ease">Submit</button>
       <button onClick = {() => {setPopup("login")}}className="float-right p-1 m-5 rounded-xl hover:tracking-widest transition-all ease text-green-900  hover:text-green-700 underline">Log In</button>
    </Popup>
    <Popup hidden = {popup == "login"} error = {errorMsg}>
    <h1 id = "hider" className = "text-4xl m-4">Log In</h1>
        <hr className = "text-green-950 w-full border-black border-2"></hr>
        <div className="flex flex-col m-4 gap-5 text-2xl">
          <h1>Username</h1>
          <input id = "lu" type = "text" className="bg-green-100 focus:bg-green-300 transition-all ease rounded-xl border-green-900 focus:border-8"></input>
          <h1 >Password</h1>
          <input id = "lp" type = "password" className="bg-green-100 focus:bg-green-300 transition-all ease rounded-xl border-green-900 focus:border-8"></input>
        </div>
       <button onClick = {Login}className = "float-right bg-green-400 p-1 m-5 rounded-xl hover:tracking-widest hover:bg-green-600 transition-all ease">Submit</button>
    </Popup>
    <Popup hidden = {popup == "post"} error = {errorMsg}>
        <h1 id = "hider" className = "text-4xl m-4">Create Post</h1>
        <hr className = "text-green-950 w-full border-black border-2"></hr>
        <div className="flex flex-col m-4 gap-5 text-2xl">
          <h1>Content</h1>
          <textarea rows = "5" id = "pc" className="bg-green-100 focus:bg-green-300 transition-all ease rounded-xl border-green-900 focus:border-8"></textarea>
        </div>
       <button onClick = {MakePost} className = "float-right bg-green-400 p-1 px-5 m-5 rounded-xl hover:tracking-widest hover:bg-green-600 transition-all ease">Post</button>
    </Popup>
    </>
  )
}

export default App
