import { ProfileSidebar } from "./sidebar.jsx"
import { Popup } from "./popup.jsx"
function App() {
  return (
    <>
    <div className = "flex w-fit static">
      <ProfileSidebar />
      <div className = "flex flex-col h-screen">
        <h1 className = "lg:text-4xl sm:text-2xl">Posts</h1>
        <img src = "./src/ofo.jpg"></img>
      </div>
    </div>
    <Popup button = "Submit">
        <h1 className = "text-4xl m-4">Create an Account</h1>
        <hr className = "text-green-950 w-full border-black border-2"></hr>
        <div className="flex flex-col m-4 gap-5 text-2xl">
          <h1>Username</h1>
          <input type = "text" className="bg-green-100 focus:bg-green-300 transition-all ease rounded-xl"></input>
          <h1>Password</h1>
          <input type = "password" className="bg-green-100 focus:bg-green-300 transition-all ease rounded-xl"></input>
        </div>
    </Popup>
    </>
  )
}

export default App
