import { ProfileSidebar } from "./sidebar.jsx"
function App() {
  return (
    <div className = "flex w-fit static">
    <ProfileSidebar />
    <div className = "flex flex-col h-screen">
      <h1 className = "text-4xl">Posts</h1>
      <img src = "./src/ofo.jpg"></img>
    </div>
    </div>
  )
}

export default App
