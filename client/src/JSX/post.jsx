import {useState, useEffect} from "react"

export function Post(props){
    return(
        <div className="bg-green-900 w-96 shrink-0 h-80 rounded-3xl">
            <div className="flex flex-col">
                <div className="flex flex-col bg-green-800 w-full p-4 rounded-2xl">
                <h1 className="text-4xl">{props.displayname}</h1>
                <h1 className="text-neutral-800">@{props.username}</h1>
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
            newFeed[i] = (<Post content = {post.content} username = {post.profile.username} displayname = {post.profile.displayname} ></Post>)
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
    <h1 className = "text-4xl">Posts</h1>
    {props.children}
    </div>
    <div id = "scroll"className="flex flex-row w-full h-fit overflow-auto hover:overflow-scroll gap-10 bg-green-950 p-10 rounded-3xl hover:shadow-2xl hover:rounded-md transition-all ease">
        {feed}
    </div>
    </>
  )

}