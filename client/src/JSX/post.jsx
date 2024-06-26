import {useState, useEffect} from "react"

export function Post(props){
    return(
        <div className="bg-green-900 hover:border-8 transition-all ease border-green-950 break-words w-68 sm:w-96 shrink-0 h-80 rounded-3xl">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between transition-all ease hover:drop-shadow-2xl bg-green-800 rounded-2xl">
                    <div className="flex flex-col w-full p-4">
                        <h1 className="transition-all ease hover:tracking-widest  text-4xl">{props.displayname}</h1>
                        <h1 className="transition-all ease hover:tracking-widest  text-neutral-800">@{props.username}</h1>
                    </div>
                    <img src = {props.pfp} className="w-24 h-24 aspect-square object-cover bg-green-950 border-green-700 border-4 transition-all ease hover:rounded-[25%] rounded-[100%] m-5"></img>
                </div>
                <h1 className="m-5 text-xl inline-block overflow-y-scroll">{props.content}</h1>
            </div>
        </div>
    )
}
export function Feed(props){
    const [feed, setFeed] = useState([])
    useEffect(()=>{
    async function getFeed(){
        await props.feedHandler.GetPostData()
        let newFeed = []
        props.feedHandler.postData.forEach((post,i)=>{

            newFeed[i] = (<Post content = {post.content} username = {post.profile.username} displayname = {post.profile.displayname} pfp = {post.profile.pfpURL}></Post>)
        })
        setFeed(newFeed)
    }
    if(props.feedHandler.postData.length == 0){
    getFeed();
    }
    },[])
    return( 
        <>
    <div className="flex flex-row m-5 gap-5">
    <h1 className = "text-4xl transition-all ease hover:tracking-widest">Posts</h1>
    {props.children}
    </div>
    <div id = "scroll"className="flex flex-row w-full h-fit overflow-auto hover:overflow-scroll gap-10 bg-green-950 p-10 rounded-3xl hover:shadow-2xl hover:rounded-md transition-all ease">
        {feed}
    </div>
    </>
  )

}