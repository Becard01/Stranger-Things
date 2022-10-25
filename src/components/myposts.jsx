import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import {fetchPosts} from "../api/api.js"




const Myposts = (props) => {

const {posts, myPosts } = props

const [mypostsearchstring, setMyPostSearchstring] = useState ("")


const handleSearch = (event) => {
    event.preventDefault();
    const inputElement = event.target;
    const newValue = inputElement.value;
    setMyPostSearchstring(newValue);

    console.log (mypostsearchstring)
}









return (
    <div id="posts">
        <div id="postheadercontainer">
            <div id="postheaderbox">
               
                <span>
                <input id = "search" 
                type = "text"
                placeholder="Search"
                value={mypostsearchstring}
                onChange={handleSearch}/>
                </span>

                <button id="addpost" ><Link to="/posts/add" id="addlink">ADD POST</Link></button>
                
                
        
       
            </div>
        </div>


      {posts.data.posts.map((post) => {
    
        return (
            
         <div id= "card" key = {post._id}>   
        {post.isAuthor===true? 
            <>
        <div id="postcard">  
        <div id="innercard">
        <div> Title: {post.title}</div>
        <div> Description: {post.description}</div>
        <div> Price: {post.price}</div>
        <div> Location {post.location}</div>
        <div> Will Deliver? {post.willDeliver}</div>
        <div className="deleteeditdiv"><button className="deletepost"> DELETE POST</button>
        <button className="editpost"> EDIT POST</button></div>
        
        </div> 
        </div>
        </> : null
      }
        </div>
        
        )
    }
   
    
    )
      
    }
    
    </div>
);
}

export {Myposts};