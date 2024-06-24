import { useState } from "react"
export function Popup(props){
    const [hidden, setHidden] = useState(false);
    function Hide(){
        setHidden(true)
        props.method()
    }
    return(
    <div style = {hidden ? {display:"none"} : {display:"flex"}}className="flex justify-center align-middle w-screen h-screen absolute top-0 left-0">
        <div className = "fixed w-screen h-screen opacity-50 bg-black">
        </div>
        <div className="bg-green-200 z-20 w-1/2 h-fit m-20 rounded-lg">
           {props.children}
           <button onClick = {Hide} className = "float-right bg-green-400 p-1 m-5 rounded-xl hover:tracking-widest hover:bg-green-600 transition-all ease">{props.button}</button>
        </div>
    </div>)
}