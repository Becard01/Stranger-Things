import React, { useState, useEffect } from "react";
import {BrowserRouter, Route, Link, useNavigate} from "react-router-dom";
import {fetchMessages, fetchPosts} from "../api/api.js";
import { deletePost } from "../api/api.js";



const Posts = (props) => {

const {posts, myPosts, setSelectPost, tokenNumber, setMessages, setPosts, usernameString,
messages} = props

const [searchstring, setSearchstring] = useState ("")
const [renderposts, setRenderposts] = useState (posts.data.posts)


const navigate = useNavigate()

//*****Added a UseEffect here for debugging purposes.  
//"posts" was not populating after refresh, so tried to getPosts and getMessages with this*/

useEffect(() =>{
if (tokenNumber){
    const getPosts = async () => {
      try {
            const results = await fetchPosts(tokenNumber)
            console.log ("useEfect fetchPosts success Post component")
            setPosts(results);
        }
        catch (error) {
          console.error(error);
        }
      }
  getPosts()
                }
  
  const getMessages = async () => {
    if (!messages){
    try { if (tokenNumber){
          const results = await fetchMessages(tokenNumber)
          setMessages(results);
         }}
      catch (error) {
        console.error(error);
    }}
    
    }
  getMessages()
  
}, [tokenNumber]); 



const handleSearch = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setSearchstring(newValue);
    const found = posts.data.posts.filter((post) =>{
       return (post.title.toLowerCase().includes(`${searchstring}`) || 
       post.description.toLowerCase().includes(`${searchstring}`)|| 
       post.price.toLowerCase().includes(`${searchstring}`)|| 
       post.location.toLowerCase().includes(`${searchstring}`))});
       setRenderposts(found)
        console.log ("found", found)
    

    console.log (searchstring)
}

function handleSendMessageClick (post)  {
    setSelectPost(post);
    navigate ("/mymessages/sendmessage")

}

function handleEditClick(post){
    setSelectPost (post)
    navigate ("/myposts")

}


async function handleDeleteClick(postID){
    try {
          
        const results = await deletePost(tokenNumber, postID)
        console.log (results)
        navigate ("/myposts")
       }
    catch (error) {
      console.error(error);
    }
    }





console.log ("posts at the time of map", posts.data.posts)

return (
    <div id="posts">
        <div id="postheadercontainer">
            <div id="postheaderbox">
               
                <span>
                <input id = "search" 
                type = "text"
                placeholder="Search"
                value={searchstring}
                onChange={handleSearch}/>
                </span>
                <button id="myposts" ><Link to="/myposts" id="myposts">MY POSTS</Link></button>
                <button id="addpost" ><Link to="./add" id="addlink">ADD POST</Link></button>
                
        
       
            </div>
        </div>

       
      { renderposts.map((post) => {
    
        return (
            
         <div id= "card" key = {post._id}>   
            <>
        <div id="postcard">  
        <div id="innercard">
        <div> Title: {post.title}</div>
        <div> Description: {post.description}</div>
        <div> Price: {post.price}</div>
        <div> Location {post.location}</div>
        <div> Will Deliver? {post.willDeliver}</div>
        {post.isAuthor===true?  <div className="deleteeditdiv">
        <button className="deletepost"  onClick={() => handleDeleteClick(post._id)}> DELETE POST</button>
        <button className="editpost"onClick={()=> handleEditClick(post)}> EDIT POST</button></div>
         : <div className= "sendmessagediv"><button className ="sendamessage"
         onClick={() => handleSendMessageClick(post)} > Send Message </button></div>
        }
         </div> 
        </div>
        </>
        </div>

        )
    }
   
    
  )
  
}
    
    </div>
);


}

export {Posts};