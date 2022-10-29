import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { deletePost } from "../api/api.js";



const Posts = (props) => {
  
const {posts, setSelectPost, tokenNumber } = props


const [searchstring, setSearchstring] = useState ("")


const [renderposts, setRenderposts] = useState (posts)

const navigate = useNavigate()


const handleSearch = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setSearchstring(newValue);
    const found = posts.filter((post) =>{
       return (post.title.toLowerCase().includes(`${searchstring}`) || 
       post.description.toLowerCase().includes(`${searchstring}`)|| 
       post.price.toLowerCase().includes(`${searchstring}`)|| 
       post.location.toLowerCase().includes(`${searchstring}`))});
       setRenderposts(found)
        console.log ("found", found)
    

    console.log (searchstring)
}

useEffect(() =>{
   setRenderposts(posts)
        
   }, [posts]); 

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

       
      {Array.isArray(renderposts) && renderposts.map((post) => {
    
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