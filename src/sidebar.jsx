import {Arrow, Heart, Person} from "./svg.jsx"
import { useState } from "react";
const iconBasic = "transition-all ease brightness-50 group-hover:brightness-100 fill-green-700"
function Sidebar(props){
    const [open, setOpen] = useState(true);
    function toggleOpen(){
    open ? setOpen(false) : setOpen(true);
    }
    const styles = "transition-all ease duration-500 bg-green-950 top-0 w-64 h-max flex flex-col border-r-4 border-neutral-950 text-center align-middle "
    return(
      <div style = {open ? {marginLeft: "0rem"} : {marginLeft: "-16rem"}} className = "flex transition-all duration-500 ease">
      <div className = {styles}>
      <h1 className="hover:tracking-widest transition-all ease bg-green-900 w-full h-fit py-10 text-4xl">Natestagram</h1>
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
      <div>
      <h1 className = "text-slate-300 text-2xl hover:tracking-widest transition-all ease">Brian Johnson</h1>
      <h4 className = "text-neutral-500 text-lg italic hover:tracking-widest transition-all ease ">@brian_johnson99</h4>
      </div>
    )
  }
  function Stat(props){
    return(
      <div className = "group flex flex-col w-fit">
        <div className = "stroke-1 transition:all ease w-20 justify-center">
        {props.icon}
        </div>
        <h1 className = "text-lg text-neutral-400 transition-all ease group-hover:tracking-widest group-hover:text-neutral-100"><strong>{props.number}</strong><br />{props.name}</h1>
      </div>
  
    )
  }
  function Stats(props){
   return( 
   <div className = "flex flex-row w-full justify-center gap-3">
    <Stat number = "2.2k" name = "loves" icon = {<Heart className = {iconBasic}/>} />
    <Stat number = "618" name = "followers" icon = {<Person className = {iconBasic} />} />
   </div>
  )
  }
  export function ProfileSidebar(){
    return(
        <Sidebar>
            <ProfilePicture />
            <NamePlate />
            <Stats />
        </Sidebar>
    )
  }
