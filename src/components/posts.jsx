import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import {fetchPosts} from "../api/api.js"




const Posts = (props) => {

const {posts, myPosts, setSelectPost } = props

const [searchstring, setSearchstring] = useState ("")

const navigate = useNavigate()





    


const handleSearch = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setSearchstring(newValue);

    console.log (searchstring)


}


function handleSendMessageClick(post){
    setSelectPost(post);
    navigate ("/mymessages/sendmessage")

}





console.log ("posts", posts)
console.log ("myposts", myPosts)

//const found = posts.includes(searchstring);
    
  //  console.log (found)


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


      {posts.data.posts.map((post) => {
    
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
        {post.isAuthor===true?  <div className="deleteeditdiv"><button className="deletepost"> DELETE POST</button>
        <button className="editpost"> EDIT POST</button></div>
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