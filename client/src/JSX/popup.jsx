export function Popup(props){
    return(
    <div style = {props.hidden ? {display:"flex"} : {display:"none"}}className="flex justify-center align-middle w-screen h-screen absolute top-0 left-0">
        <div className = "fixed w-screen h-screen opacity-50 bg-black">
        </div>
        <div className="bg-green-200 z-20 w-1/2 h-fit m-20 rounded-lg">
           {props.children}
           <h1 className="text-red-500 ml-5">{props.error}</h1>
        </div>
    </div>)
}
