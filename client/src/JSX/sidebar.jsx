import {Arrow, Heart, Person} from "./svg.jsx"
import { useState } from "react";
const iconBasic = "transition-all ease brightness-50 group-hover:brightness-100 fill-green-700"
function Sidebar(props){
    const [open, setOpen] = useState(true);
    const [width, setWidth] = useState(window.innerWidth < 640 ? "-6rem": "-16rem") //resize
    function toggleOpen(){
    open ? setOpen(false) : setOpen(true); //toggle
    }

    const styles = "transition-all ease duration-500 bg-green-950 top-0 w-24 sm:w-64 overflow-hidden h-dbh flex flex-col border-r-4 border-neutral-950 text-center align-middle "
    window.addEventListener("resize", function(){setWidth(window.innerWidth < 640 ? "-6rem": "-16rem")}) 

    return(
      <div style = {open ? {marginLeft: "0rem"} : {marginLeft: width}} className = "flex transition-all duration-500 ease">
        <div className = {styles}>
          <h1 className="hover:tracking-widest transition-all ease bg-green-900 w-full h-fit py-10 text-5xl sm:text-4xl">{width == "-6rem" ? "N" : "Natestagram"}</h1>
          {props.children}
        </div>
        <button className = "right-10 transition-all ease w-10 hover:fill-green-800 fill-green-950" onClick = {toggleOpen}>
          <Arrow rotate = {open} className = "w-full transition-all ease"/>
        </button>
      </div>
    )
  }
  function ProfilePicture(props){
    return(
      <img src = "./src/ofo.jpg" className = "transition-all ease hover:rounded rounded-3xl aspect-sqaure border-4 border-green-700 mt-10"></img>
    )
  }
  function NamePlate(props){
    return(
      <div className = "hidden sm:block">
      <h1 className = "text-slate-300 text-2xl hover:tracking-widest transition-all ease">{props.name}</h1>
      <h4 className = "text-neutral-500 text-lg italic hover:tracking-widest transition-all ease ">@{props.username}</h4>
      </div>
    )
  }
  function Stat(props){
    return(
      <div className = "group flex flex-col w-fit">
        <div className = "stroke-1 transition:all ease w-20">
        {props.icon}
        </div>
        <h1 className = "text-lg text-neutral-400 transition-all ease group-hover:tracking-widest group-hover:text-neutral-100"><strong>{props.number}</strong><br />{props.name}</h1>
      </div>
  
    )
  }
  function Stats(props){
   return( 
   <div className = "flex flex-col sm:flex-row justify-center ml-1.5 mt-5">
    <Stat number = "2.2k" name = "loves" icon = {<Heart className = {iconBasic}/>} />
    <Stat number = "618" name = "followers" icon = {<Person className = {iconBasic} />} />
   </div>
  )
  }
  export function ProfileSidebar(props){
    return(
        <Sidebar>
            <ProfilePicture />
            <NamePlate name = {props.name} username = {props.username} />
            <Stats />
        </Sidebar>
    )
  }
