import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import {fetchMessages} from "../api/api.js"




const Messages = (props) => {

const {messages, setMessages, setMessagesToMe, setMessagesFromMe, tokenNumber } = props

const [] = useState ("")



const getMessages = async () => {
    try {
          
          const results = await fetchMessages(tokenNumber)
          console.log (results)
          setMessages(results);
         }
      catch (error) {
        console.error(error);
    
      }
    
    }

    getMessages()





    return (
    <div id="messagestomecontainer">
        
        <div id="messageheadercontainer">
            <div id="messageheaderbox">
               
             Messages To Me:
       
            </div>
        </div>
        <button id="sendmessagelink"> <Link to="/mymessages/sendmessage" 
        id="sendmessagelink">Send A Message</Link></button>

      {//posts.data.posts.map((post) => {
    
       // return (
            
      //   <div id= "card" key = {post._id}>   
       //     <>
     //   <div id="postcard">  
     //   <div id="innercard">
     //   <div> Title: {post.title}</div>
     //   <div> Description: {post.description}</div>
     //   <div> Price: {post.price}</div>
     //   <div> Location {post.location}</div>
     //   <div> Will Deliver? {post.willDeliver}</div>

     //   </div> 
     //   </div>
     //   </>
     //  </div>

      //  )
   // } )
      }

        <div id="messageheadercontainer">
            <div id="messageheaderbox">
               
             Messages From Me:
       
            </div>
        </div>

        {//posts.data.posts.map((post) => {
    
   // return (
        
   //  <div id= "card" key = {post._id}>   
     //   <>
  //  <div id="postcard">  
   // <div id="innercard">
  //  <div> Title: {post.title}</div>
 //   <div> Description: {post.description}</div>
 //   <div> Price: {post.price}</div>
 //   <div> Location {post.location}</div>
//    <div> Will Deliver? {post.willDeliver}</div>

  //  </div> 
 //   </div>
 //   </>
////    </div>

  //  )
//} )
  }





    </div>

    




);
}

export {Messages};