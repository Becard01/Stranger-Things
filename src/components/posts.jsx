import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import {fetchMessages, fetchPosts} from "../api/api.js";
import { deletePost } from "../api/api.js";
import { getPosts } from "../index"





const Posts = (props) => {

const {posts, myPosts, setSelectPost, tokenNumber, setMessages, setPosts, usernameString,
messages} = props

const [searchstring, setSearchstring] = useState ("")

const navigate = useNavigate()


const getMessages = async () => {
    if (!messages){
    try { if (tokenNumber){
          
          const results = await fetchMessages(tokenNumber)
          setMessages(results);
          await fetchPosts(tokenNumber)
         }}
      catch (error) {
        console.error(error);
    
      }}
    
    }
if (!messages) {getMessages()}




const handleSearch = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setSearchstring(newValue);

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
       // await fetchPosts(tokenNumber)
        navigate ("/myposts")
        //const getPosts = async () => {
            //try {
                  
                //  const results = await fetchPosts(tokenNumber)
                //  console.log (results)
                //  setPosts(results);
                //  results.data.posts.map(array => {
                 //   console.log (array.isAuthor)
                 //   if (array.author.username===usernameString){
                  //   return console.log ("myArray", array)
                  //   }
                
                  //})
                 // navigate ("/myposts")
              //  }
            //  catch (error) {
              //  console.error(error);
            
             // }
            
          //  }
        
           // getPosts()
        



       }
    catch (error) {
      console.error(error);
  
    }
    
}



//console.log ("posts", posts)
//console.log ("myposts", myPosts)



if (tokenNumber && posts){
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

       
      { posts? posts.data.posts.map((post) => {
    
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
   :null   
}
    
    </div>
);
}

}

export {Posts};